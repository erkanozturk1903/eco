import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_date: string;
  image_url: string;
  category: string;
  is_featured: boolean;
}

const ArticlesManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    published_date: '',
    image_url: '',
    category: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Makaleler yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      published_date: article.published_date,
      image_url: article.image_url,
      category: article.category,
    });
  };

  const handleSave = async (id: number) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Makale güncellendi',
      });

      setEditingId(null);
      fetchArticles();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Makale güncellenemedi',
        variant: 'destructive',
      });
    }
  };

  const toggleFeatured = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: !currentStatus
          ? 'Makale öne çıkarıldı'
          : 'Makale öne çıkartılmaktan kaldırıldı',
      });

      fetchArticles();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'İşlem başarısız',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu makaleyi silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Başarılı',
        description: 'Makale silindi',
      });

      fetchArticles();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Makale silinemedi',
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
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                {editingId === article.id ? 'Makaleyi Düzenle' : article.title}
                {article.is_featured && (
                  <Badge className="bg-secondary">
                    <Star className="w-3 h-3 mr-1" />
                    Öne Çıkan
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {editingId === article.id ? (
                  <>
                    <Button size="sm" onClick={() => handleSave(article.id)}>
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
                      onClick={() =>
                        toggleFeatured(article.id, article.is_featured)
                      }
                    >
                      <Star
                        className={`w-4 h-4 ${
                          article.is_featured ? 'fill-current' : ''
                        }`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(article)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingId === article.id ? (
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
                  <Label>Özet</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={2}
                  />
                </div>
                <div>
                  <Label>İçerik</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Yazar</Label>
                    <Input
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Kategori</Label>
                    <Input
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Yayın Tarihi</Label>
                    <Input
                      type="date"
                      value={formData.published_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published_date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Resim URL</Label>
                    <Input
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-4">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-32 h-24 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-2">
                      {article.excerpt}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>
                        {new Date(article.published_date).toLocaleDateString(
                          'tr-TR'
                        )}
                      </span>
                    </div>
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

export default ArticlesManager;
