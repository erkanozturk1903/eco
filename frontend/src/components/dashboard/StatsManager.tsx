import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
  color: string;
  display_order: number;
}

const StatsManager = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    value: '',
    label: '',
    icon: '',
    color: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setStats(data || []);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'İstatistikler yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stat: Stat) => {
    setEditingId(stat.id);
    setFormData({
      value: stat.value,
      label: stat.label,
      icon: stat.icon,
      color: stat.color,
    });
  };

  const handleSave = async (id: number) => {
    try {
      const { error } = await supabase
        .from('stats')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'İstatistik güncellendi',
      });

      setEditingId(null);
      fetchStats();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'İstatistik güncellenemedi',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu istatistiği silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase.from('stats').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'İstatistik silindi',
      });

      fetchStats();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'İstatistik silinemedi',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {stats.map((stat) => (
        <Card key={stat.id}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              {editingId === stat.id ? 'İstatistiği Düzenle' : stat.label}
              <div className="flex gap-2">
                {editingId === stat.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleSave(stat.id)}
                    >
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
                      onClick={() => handleEdit(stat)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(stat.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingId === stat.id ? (
              <div className="grid gap-4">
                <div>
                  <Label>Değer</Label>
                  <Input
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Etiket</Label>
                  <Input
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({ ...formData, label: e.target.value })
                    }
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
                  <Label>Renk</Label>
                  <Input
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Değer</p>
                  <p className="font-semibold text-2xl">{stat.value}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">İkon</p>
                  <p className="font-mono text-sm">{stat.icon}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsManager;
