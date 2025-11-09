import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Trash2,
  Mail,
  FileText,
  Building2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  industry: string | null;
  services: string[] | null;
  status: string;
  created_at: string;
  message: string | null;
  company_size: string | null;
  urgency: string | null;
  referral_source: string | null;
  notes: string | null;
}

const Forms = () => {
  const { toast } = useToast();
  const [forms, setForms] = useState<ContactForm[]>([]);
  const [filteredForms, setFilteredForms] = useState<ContactForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchForms();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [forms, searchQuery, statusFilter]);

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setForms(data || []);
      calculateStats(data || []);
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: 'Formlar yüklenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('contact_forms_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_forms',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            toast({
              title: 'Yeni Form',
              description: 'Yeni bir form gönderimi alındı.',
            });
            fetchForms();
          } else if (payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            fetchForms();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const calculateStats = (data: ContactForm[]) => {
    setStats({
      total: data.length,
      new: data.filter((f) => f.status === 'new').length,
      contacted: data.filter((f) => f.status === 'contacted').length,
      completed: data.filter((f) => f.status === 'completed').length,
    });
  };

  const applyFilters = () => {
    let filtered = [...forms];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (form) =>
          form.name.toLowerCase().includes(query) ||
          form.email.toLowerCase().includes(query) ||
          form.company_name?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((form) => form.status === statusFilter);
    }

    setFilteredForms(filtered);
  };

  const handleStatusChange = async (formId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_forms')
        .update({ status: newStatus })
        .eq('id', formId);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Durum güncellendi.',
      });
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: 'Durum güncellenirken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (formId: string) => {
    if (!confirm('Bu formu silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('contact_forms')
        .delete()
        .eq('id', formId);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Form silindi.',
      });
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: 'Form silinirken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      new: { variant: 'default', label: 'Yeni' },
      contacted: { variant: 'secondary', label: 'İletişimde' },
      qualified: { variant: 'outline', label: 'Nitelikli' },
      completed: { variant: 'default', label: 'Tamamlandı' },
      cancelled: { variant: 'destructive', label: 'İptal' },
    };

    const config = variants[status] || variants.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Az önce';
    if (diffHours < 24) return `${diffHours} saat önce`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} gün önce`;
  };

  const handleViewDetails = (form: ContactForm) => {
    setSelectedForm(form);
    setIsDetailOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredForms.map((f) => f.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Form Gönderileri">
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Form Gönderileri">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Toplam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Yeni
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                İşlemde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tamamlandı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ad, e-posta veya şirket ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Durum Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="new">Yeni</SelectItem>
                  <SelectItem value="contacted">İletişimde</SelectItem>
                  <SelectItem value="qualified">Nitelikli</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="cancelled">İptal</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Excel İndir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Selected Items Toolbar */}
        {selectedIds.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedIds.length} öğe seçildi
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Durumu Toplu Değiştir
                  </Button>
                  <Button variant="destructive" size="sm">
                    Toplu Sil
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIds([])}
                  >
                    İptal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.length === filteredForms.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Ad Soyad</TableHead>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Şirket</TableHead>
                  <TableHead>Sektör</TableHead>
                  <TableHead>Hizmetler</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Henüz form gönderimi yok</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(form.id)}
                          onCheckedChange={(checked) =>
                            handleSelectOne(form.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">{form.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {form.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {form.company_name && (
                            <>
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              {form.company_name}
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {form.industry && (
                          <Badge variant="outline">{form.industry}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {form.services && form.services.length > 0 && (
                          <div className="flex gap-1">
                            <Badge variant="secondary">{form.services[0]}</Badge>
                            {form.services.length > 1 && (
                              <Badge variant="secondary">
                                +{form.services.length - 1}
                              </Badge>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(form.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {getRelativeTime(form.created_at)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(form)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Detayları Gör
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(form.id, 'contacted')}
                            >
                              Durumu Değiştir
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(form.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Form Gönderimi Detayı</DialogTitle>
              <DialogDescription>
                {selectedForm?.created_at &&
                  new Date(selectedForm.created_at).toLocaleString('tr-TR')}
              </DialogDescription>
            </DialogHeader>

            {selectedForm && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Ad Soyad
                    </label>
                    <p className="mt-1">{selectedForm.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      E-posta
                    </label>
                    <p className="mt-1">{selectedForm.email}</p>
                  </div>

                  {selectedForm.phone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Telefon
                      </label>
                      <p className="mt-1">{selectedForm.phone}</p>
                    </div>
                  )}

                  {selectedForm.company_name && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Şirket Adı
                      </label>
                      <p className="mt-1">{selectedForm.company_name}</p>
                    </div>
                  )}

                  {selectedForm.industry && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Sektör
                      </label>
                      <p className="mt-1">{selectedForm.industry}</p>
                    </div>
                  )}

                  {selectedForm.company_size && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Şirket Büyüklüğü
                      </label>
                      <p className="mt-1">{selectedForm.company_size}</p>
                    </div>
                  )}

                  {selectedForm.urgency && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Aciliyet
                      </label>
                      <p className="mt-1">{selectedForm.urgency}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Durum
                    </label>
                    <p className="mt-1">{getStatusBadge(selectedForm.status)}</p>
                  </div>
                </div>

                {selectedForm.services && selectedForm.services.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      İstenen Hizmetler
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedForm.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedForm.message && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Mesaj
                    </label>
                    <p className="mt-2 p-4 bg-muted rounded-lg">
                      {selectedForm.message}
                    </p>
                  </div>
                )}

                {selectedForm.referral_source && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Referans Kaynağı
                    </label>
                    <p className="mt-1">{selectedForm.referral_source}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    E-posta Gönder
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Not Ekle
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDelete(selectedForm.id);
                      setIsDetailOpen(false);
                    }}
                  >
                    Sil
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Forms;
