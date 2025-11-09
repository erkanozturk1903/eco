import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
  display_order: number;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    price: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Hizmetler yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      price: service.price,
    });
  };

  const handleSave = async (id: number) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Hizmet güncellendi',
      });

      setEditingId(null);
      fetchServices();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Hizmet güncellenemedi',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Hizmet silindi',
      });

      fetchServices();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Hizmet silinemedi',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {services.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              {editingId === service.id ? 'Hizmeti Düzenle' : service.title}
              <div className="flex gap-2">
                {editingId === service.id ? (
                  <>
                    <Button size="sm" onClick={() => handleSave(service.id)}>
                      Kaydet
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      İptal
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingId === service.id ? (
              <div className="grid gap-4">
                <div>
                  <Label>Başlık</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Açıklama</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label>İkon</Label>
                  <Input
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Fiyat</Label>
                  <Input
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-muted-foreground">{service.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    İkon: {service.icon}
                  </span>
                  <span className="font-semibold text-primary text-lg">
                    {service.price}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServicesManager;
