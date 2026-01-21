import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Newspaper, Plus, Search, Filter, Eye, Calendar, Trash2, Edit2,
  EyeOff, Loader2, X, Upload, Save, ChevronDown, Star, StarOff
} from 'lucide-react';
import { articlesApi, uploadApi, getUploadUrl } from '@/lib/api';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  order: number;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  category_id: number | null;
  category: Category | null;
  is_published: boolean;
  is_featured: boolean;
  views: number;
  read_time: number | null;
  published_at: string | null;
  created_at: string;
}

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [articlesRes, categoriesRes] = await Promise.all([
        articlesApi.getAdmin(selectedCategory || undefined),
        articlesApi.getCategories()
      ]);
      setArticles(articlesRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = () => {
    setEditingArticle({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category_id: null,
      is_published: false,
      is_featured: false,
      read_time: 5
    });
    setShowModal(true);
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setShowModal(true);
  };

  const handleSaveArticle = async () => {
    if (!editingArticle?.title || !editingArticle?.slug || !editingArticle?.content) {
      alert('Başlık, slug ve içerik zorunludur');
      return;
    }

    try {
      setSaving(true);
      if (editingArticle.id) {
        await articlesApi.update(editingArticle.id, editingArticle);
      } else {
        await articlesApi.create(editingArticle);
      }
      setShowModal(false);
      setEditingArticle(null);
      loadData();
    } catch (error) {
      console.error('Makale kaydedilirken hata:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      await articlesApi.update(article.id, { is_published: !article.is_published });
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, is_published: !a.is_published } : a));
    } catch (error) {
      console.error('Makale güncellenirken hata:', error);
    }
  };

  const handleToggleFeatured = async (article: Article) => {
    try {
      await articlesApi.update(article.id, { is_featured: !article.is_featured });
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, is_featured: !a.is_featured } : a));
    } catch (error) {
      console.error('Makale güncellenirken hata:', error);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Bu makaleyi silmek istediğinize emin misiniz?')) return;
    try {
      await articlesApi.delete(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Makale silinirken hata:', error);
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      const response = await uploadApi.uploadImage(file);
      setEditingArticle(prev => prev ? { ...prev, image_url: response.data.url } : null);
    } catch (error) {
      console.error('Resim yüklenirken hata:', error);
    }
  };

  // Category handlers
  const handleCreateCategory = () => {
    setEditingCategory({ name: '', slug: '', description: '', order: categories.length });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async () => {
    if (!editingCategory?.name || !editingCategory?.slug) {
      alert('İsim ve slug zorunludur');
      return;
    }
    try {
      setSaving(true);
      if (editingCategory.id) {
        await articlesApi.updateCategory(editingCategory.id, editingCategory);
      } else {
        await articlesApi.createCategory(editingCategory);
      }
      setShowCategoryModal(false);
      setEditingCategory(null);
      loadData();
    } catch (error) {
      console.error('Kategori kaydedilirken hata:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
    try {
      await articlesApi.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Kategori silinirken hata:', error);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.is_published).length,
    views: articles.reduce((sum, a) => sum + a.views, 0)
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Blog Yönetimi</h2>
          <p className="text-sm text-gray-500 mt-1">Blog yazılarını oluşturun ve düzenleyin</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateCategory}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            Kategori
          </button>
          <button
            onClick={handleCreateArticle}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Yazı
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Toplam Yazı</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Yayınlanan</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.published}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Toplam Görüntüleme</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.views.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Yazı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="relative">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Categories List */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Kategoriler</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <div key={cat.id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <span className="text-sm">{cat.name}</span>
                <button
                  onClick={() => { setEditingCategory(cat); setShowCategoryModal(true); }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1 hover:bg-red-100 rounded text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Başlık</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Kategori</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Durum</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Görüntüleme</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tarih</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {article.image_url ? (
                        <img
                          src={getUploadUrl(article.image_url)}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <Newspaper className="w-4 h-4 text-purple-600" />
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-900">{article.title}</span>
                        {article.is_featured && (
                          <Star className="inline-block w-4 h-4 text-yellow-500 ml-2" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                      {article.category?.name || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      article.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.is_published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Eye className="w-4 h-4" />
                      {article.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.published_at || article.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleToggleFeatured(article)}
                        className={`p-2 rounded-lg ${article.is_featured ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        title={article.is_featured ? 'Öne çıkarılmış' : 'Öne çıkar'}
                      >
                        {article.is_featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleTogglePublish(article)}
                        className={`p-2 rounded-lg ${article.is_published ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        title={article.is_published ? 'Yayından kaldır' : 'Yayınla'}
                      >
                        {article.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        title="Düzenle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredArticles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Henüz makale yok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Article Modal */}
      {showModal && editingArticle && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowModal(false)} />
          <div className="fixed inset-4 md:inset-10 bg-white rounded-2xl z-50 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingArticle.id ? 'Makale Düzenle' : 'Yeni Makale'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
                    <input
                      type="text"
                      value={editingArticle.title || ''}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev!, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                      placeholder="Makale başlığı"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      value={editingArticle.slug || ''}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev!, slug: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                      placeholder="makale-url-slug"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                      value={editingArticle.category_id || ''}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev!, category_id: e.target.value ? Number(e.target.value) : null }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    >
                      <option value="">Kategori seçin</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Okuma Süresi (dk)</label>
                    <input
                      type="number"
                      value={editingArticle.read_time || 5}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev!, read_time: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                  <textarea
                    rows={2}
                    value={editingArticle.excerpt || ''}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev!, excerpt: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none"
                    placeholder="Kısa açıklama..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kapak Resmi</label>
                  <div className="flex items-center gap-4">
                    {editingArticle.image_url && (
                      <img
                        src={getUploadUrl(editingArticle.image_url)}
                        alt=""
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                    )}
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <Upload className="w-4 h-4" />
                      Resim Yükle
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İçerik *</label>
                  <textarea
                    rows={12}
                    value={editingArticle.content || ''}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev!, content: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none font-mono text-sm"
                    placeholder="Makale içeriği (Markdown desteklenir)"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.is_published || false}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev!, is_published: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">Yayınla</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.is_featured || false}
                      onChange={(e) => setEditingArticle(prev => ({ ...prev!, is_featured: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">Öne Çıkar</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                İptal
              </button>
              <button
                onClick={handleSaveArticle}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Kaydet
              </button>
            </div>
          </div>
        </>
      )}

      {/* Category Modal */}
      {showCategoryModal && editingCategory && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCategoryModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl z-50 p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingCategory.id ? 'Kategori Düzenle' : 'Yeni Kategori'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İsim *</label>
                <input
                  type="text"
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev!, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  type="text"
                  value={editingCategory.slug || ''}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev!, slug: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev!, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                İptal
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Kaydet
              </button>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Blog;
