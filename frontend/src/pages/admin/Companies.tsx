import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Building2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Company {
  id: string;
  company_name: string;
  tax_number: string | null;
  industry: string | null;
  city: string | null;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  employee_count: number | null;
  address: string | null;
  website: string | null;
}

const Companies = () => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    company_name: '',
    tax_number: '',
    trade_registry_number: '',
    industry: '',
    employee_count: '',
    annual_revenue: '',
    address: '',
    city: '',
    country: 'Türkiye',
    contact_person: '',
    email: '',
    phone: '',
    website: '',
    is_active: true,
  });

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [companies, searchQuery, industryFilter]);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCompanies(data || []);
      calculateStats(data || []);
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: 'Firmalar yüklenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data: Company[]) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    setStats({
      total: data.length,
      active: data.filter((c) => c.is_active).length,
      thisMonth: data.filter((c) => new Date(c.created_at) >= startOfMonth).length,
    });
  };

  const applyFilters = () => {
    let filtered = [...companies];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.company_name.toLowerCase().includes(query) ||
          company.tax_number?.toLowerCase().includes(query)
      );
    }

    if (industryFilter !== 'all') {
      filtered = filtered.filter((company) => company.industry === industryFilter);
    }

    setFilteredCompanies(filtered);
  };

  const handleOpenDialog = (company?: Company) => {
    if (company) {
      setEditingCompany(company);
      setFormData({
        company_name: company.company_name,
        tax_number: company.tax_number || '',
        trade_registry_number: '',
        industry: company.industry || '',
        employee_count: company.employee_count?.toString() || '',
        annual_revenue: '',
        address: company.address || '',
        city: company.city || '',
        country: 'Türkiye',
        contact_person: company.contact_person || '',
        email: company.email || '',
        phone: company.phone || '',
        website: company.website || '',
        is_active: company.is_active,
      });
    } else {
      setEditingCompany(null);
      setFormData({
        company_name: '',
        tax_number: '',
        trade_registry_number: '',
        industry: '',
        employee_count: '',
        annual_revenue: '',
        address: '',
        city: '',
        country: 'Türkiye',
        contact_person: '',
        email: '',
        phone: '',
        website: '',
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        ...formData,
        employee_count: formData.employee_count ? parseInt(formData.employee_count) : null,
      };

      if (editingCompany) {
        const { error } = await supabase
          .from('companies')
          .update(dataToSave)
          .eq('id', editingCompany.id);

        if (error) throw error;

        toast({
          title: 'Başarılı',
          description: 'Firma güncellendi.',
        });
      } else {
        const { error } = await supabase
          .from('companies')
          .insert([dataToSave]);

        if (error) throw error;

        toast({
          title: 'Başarılı',
          description: 'Firma eklendi.',
        });
      }

      setIsDialogOpen(false);
      fetchCompanies();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (companyId: string) => {
    if (!confirm('Bu firmayı silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Firma silindi.',
      });
      fetchCompanies();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: 'Firma silinirken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (companyId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('companies')
        .update({ is_active: !currentStatus })
        .eq('id', companyId);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Durum güncellendi.',
      });
      fetchCompanies();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: 'Durum güncellenirken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Firmalar">
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Firmalar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Firmalar</h2>
            <p className="text-muted-foreground">Müşteri firmalarınızı yönetin</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="h-4 w-4" />
            Yeni Firma Ekle
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Toplam Firma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bu Ay Eklenen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.thisMonth}</div>
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
                  placeholder="Firma adı veya vergi no ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sektör Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Sektörler</SelectItem>
                  <SelectItem value="Üretim">Üretim</SelectItem>
                  <SelectItem value="Finans">Finans</SelectItem>
                  <SelectItem value="Teknoloji">Teknoloji</SelectItem>
                  <SelectItem value="Perakende">Perakende</SelectItem>
                  <SelectItem value="Sağlık">Sağlık</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Firma Adı</TableHead>
                  <TableHead>Vergi No</TableHead>
                  <TableHead>Sektör</TableHead>
                  <TableHead>Şehir</TableHead>
                  <TableHead>İletişim Kişisi</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Henüz firma eklenmemiş</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => handleOpenDialog()}
                      >
                        İlk Firmayı Ekle
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {company.company_name}
                        </div>
                      </TableCell>
                      <TableCell>{company.tax_number || '-'}</TableCell>
                      <TableCell>
                        {company.industry && (
                          <Badge variant="outline">{company.industry}</Badge>
                        )}
                      </TableCell>
                      <TableCell>{company.city || '-'}</TableCell>
                      <TableCell>
                        {company.contact_person && (
                          <div>
                            <div className="font-medium">{company.contact_person}</div>
                            <div className="text-xs text-muted-foreground">
                              {company.email}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={company.is_active}
                          onCheckedChange={() =>
                            handleToggleActive(company.id, company.is_active)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(company.created_at).toLocaleDateString('tr-TR')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenDialog(company)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(company.id)}
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

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? 'Firma Düzenle' : 'Yeni Firma Ekle'}
              </DialogTitle>
              <DialogDescription>
                Firma bilgilerini doldurun
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Firma Adı *</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax_number">Vergi Numarası</Label>
                  <Input
                    id="tax_number"
                    value={formData.tax_number}
                    onChange={(e) =>
                      setFormData({ ...formData, tax_number: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Sektör</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, industry: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Üretim">Üretim</SelectItem>
                      <SelectItem value="Finans">Finans</SelectItem>
                      <SelectItem value="Teknoloji">Teknoloji</SelectItem>
                      <SelectItem value="Perakende">Perakende</SelectItem>
                      <SelectItem value="Sağlık">Sağlık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Şehir</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee_count">Çalışan Sayısı</Label>
                  <Input
                    id="employee_count"
                    type="number"
                    value={formData.employee_count}
                    onChange={(e) =>
                      setFormData({ ...formData, employee_count: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_person">İletişim Kişisi</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_person: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Web Sitesi</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Aktif</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleSave}>
                {editingCompany ? 'Güncelle' : 'Kaydet'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Companies;
