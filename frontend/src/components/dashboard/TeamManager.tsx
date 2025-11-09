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

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  display_order: number;
}

const TeamManager = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    image_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setTeam(data || []);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Takım üyeleri yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image_url: member.image_url,
    });
  };

  const handleSave = async (id: number) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Takım üyesi güncellendi',
      });

      setEditingId(null);
      fetchTeam();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Takım üyesi güncellenemedi',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu takım üyesini silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Takım üyesi silindi',
      });

      fetchTeam();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Takım üyesi silinemedi',
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
      {team.map((member) => (
        <Card key={member.id}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              {editingId === member.id ? 'Üyeyi Düzenle' : member.name}
              <div className="flex gap-2">
                {editingId === member.id ? (
                  <>
                    <Button size="sm" onClick={() => handleSave(member.id)}>
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
                      onClick={() => handleEdit(member)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingId === member.id ? (
              <div className="grid gap-4">
                <div>
                  <Label>İsim</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Pozisyon</Label>
                  <Input
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Biyografi</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Fotoğraf URL</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-4">
                  {member.image_url && (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-primary">
                      {member.position}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamManager;
