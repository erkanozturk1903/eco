import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  LayoutGrid, Image, BarChart3, HelpCircle, Save, Loader2, Check,
  Plus, Trash2, GripVertical, Eye, EyeOff, Edit2, Upload, X
} from 'lucide-react';
import { contentApi, uploadApi, getUploadUrl } from '@/lib/api';

type TabType = 'hero' | 'stats' | 'whyus';

interface HeroSlide {
  id: number;
  image_url: string;
  text_position: string;
  show_text: boolean;
  order: number;
  is_active: boolean;
}

interface HeroContent {
  id: number;
  title: string;
  subtitle: string;
}

interface StatItem {
  id: number;
  icon: string;
  value: string;
  label: string;
  description: string;
  order: number;
  is_active: boolean;
}

interface WhyUsItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
  is_active: boolean;
}

const ICON_OPTIONS = [
  'Building2', 'TreeDeciduous', 'FileCheck', 'Clock', 'Users', 'Target',
  'Award', 'Leaf', 'BarChart3', 'FileSpreadsheet', 'Cpu', 'Shield',
  'Zap', 'Globe', 'Heart', 'Star', 'TrendingUp', 'CheckCircle'
];

const Content = () => {
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hero data
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent>({ id: 0, title: '', subtitle: '' });

  // Stats data
  const [stats, setStats] = useState<StatItem[]>([]);

  // Why Us data
  const [whyUs, setWhyUs] = useState<WhyUsItem[]>([]);

  const tabs = [
    { id: 'hero' as TabType, name: 'Hero Slider', icon: Image },
    { id: 'stats' as TabType, name: 'İstatistikler', icon: BarChart3 },
    { id: 'whyus' as TabType, name: 'Neden Biz', icon: HelpCircle },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [slidesRes, textRes, statsRes, whyUsRes] = await Promise.all([
        contentApi.getHeroSlides(),
        contentApi.getHeroText(),
        contentApi.getStats(),
        contentApi.getWhyUs(),
      ]);
      setHeroSlides(slidesRes.data);
      setHeroContent(textRes.data);
      setStats(statsRes.data);
      setWhyUs(whyUsRes.data);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHeroText = async () => {
    try {
      setSaving(true);
      await contentApi.updateHeroText({
        title: heroContent.title,
        subtitle: heroContent.subtitle
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Hero text kaydedilirken hata:', error);
      alert('Kaydetme hatası!');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await uploadApi.uploadImage(file);
      const imageUrl = response.data.url;

      // Create new slide with uploaded image
      const newSlide = {
        image_url: imageUrl,
        text_position: 'center',
        show_text: true,
        order: heroSlides.length,
        is_active: true
      };

      const slideResponse = await contentApi.createHeroSlide(newSlide);
      setHeroSlides(prev => [...prev, slideResponse.data]);
      setShowUploadModal(false);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Resim yüklenirken hata:', error);
      alert('Resim yüklenirken bir hata oluştu!');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleSlide = async (slide: HeroSlide) => {
    try {
      await contentApi.updateHeroSlide(slide.id, { is_active: !slide.is_active });
      setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, is_active: !s.is_active } : s));
    } catch (error) {
      console.error('Slide güncellenirken hata:', error);
    }
  };

  const handleDeleteSlide = async (id: number) => {
    if (!confirm('Bu slaytı silmek istediğinize emin misiniz?')) return;
    try {
      await contentApi.deleteHeroSlide(id);
      setHeroSlides(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Slide silinirken hata:', error);
    }
  };

  const handleUpdateSlidePosition = async (slide: HeroSlide, position: string) => {
    try {
      await contentApi.updateHeroSlide(slide.id, { text_position: position });
      setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, text_position: position } : s));
    } catch (error) {
      console.error('Slide güncellenirken hata:', error);
    }
  };

  const handleToggleSlideText = async (slide: HeroSlide) => {
    try {
      await contentApi.updateHeroSlide(slide.id, { show_text: !slide.show_text });
      setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, show_text: !s.show_text } : s));
    } catch (error) {
      console.error('Slide güncellenirken hata:', error);
    }
  };

  const handleSaveStat = async (stat: StatItem) => {
    try {
      await contentApi.updateStat(stat.id, stat);
    } catch (error) {
      console.error('Stat kaydedilirken hata:', error);
    }
  };

  const handleToggleStat = async (stat: StatItem) => {
    try {
      await contentApi.updateStat(stat.id, { is_active: !stat.is_active });
      setStats(prev => prev.map(s => s.id === stat.id ? { ...s, is_active: !s.is_active } : s));
    } catch (error) {
      console.error('Stat güncellenirken hata:', error);
    }
  };

  const handleDeleteStat = async (id: number) => {
    if (!confirm('Bu istatistiği silmek istediğinize emin misiniz?')) return;
    try {
      await contentApi.deleteStat(id);
      setStats(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Stat silinirken hata:', error);
    }
  };

  const handleAddStat = async () => {
    try {
      const newStat = {
        icon: 'Star',
        value: '0',
        label: 'Yeni İstatistik',
        description: 'Açıklama',
        order: stats.length,
        is_active: true
      };
      const response = await contentApi.createStat(newStat);
      setStats(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Stat eklenirken hata:', error);
    }
  };

  const handleSaveWhyUs = async (item: WhyUsItem) => {
    try {
      await contentApi.updateWhyUs(item.id, item);
    } catch (error) {
      console.error('WhyUs kaydedilirken hata:', error);
    }
  };

  const handleToggleWhyUs = async (item: WhyUsItem) => {
    try {
      await contentApi.updateWhyUs(item.id, { is_active: !item.is_active });
      setWhyUs(prev => prev.map(w => w.id === item.id ? { ...w, is_active: !w.is_active } : w));
    } catch (error) {
      console.error('WhyUs güncellenirken hata:', error);
    }
  };

  const handleDeleteWhyUs = async (id: number) => {
    if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;
    try {
      await contentApi.deleteWhyUs(id);
      setWhyUs(prev => prev.filter(w => w.id !== id));
    } catch (error) {
      console.error('WhyUs silinirken hata:', error);
    }
  };

  const handleAddWhyUs = async () => {
    try {
      const newItem = {
        icon: 'Star',
        title: 'Yeni Özellik',
        description: 'Açıklama',
        order: whyUs.length,
        is_active: true
      };
      const response = await contentApi.createWhyUs(newItem);
      setWhyUs(prev => [...prev, response.data]);
    } catch (error) {
      console.error('WhyUs eklenirken hata:', error);
    }
  };

  const renderHeroTab = () => (
    <div className="space-y-8">
      {/* Hero Text */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Hero Metni</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
            <textarea
              rows={2}
              value={heroContent.title}
              onChange={(e) => setHeroContent(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
            <textarea
              rows={3}
              value={heroContent.subtitle || ''}
              onChange={(e) => setHeroContent(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <button
            onClick={handleSaveHeroText}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Metni Kaydet
          </button>
        </div>
      </div>

      {/* Hero Slides */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Slaytlar</h4>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Slayt Ekle
          </button>
        </div>
        <div className="space-y-3">
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className={`flex items-center gap-4 p-4 bg-white border rounded-lg ${!slide.is_active ? 'opacity-50' : ''}`}
            >
              <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
              <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={getUploadUrl(slide.image_url)}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f3f4f6" width="100" height="100"/><text fill="%239ca3af" x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12">No Image</text></svg>';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{slide.image_url}</p>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Pozisyon:</span>
                    <select
                      value={slide.text_position}
                      onChange={(e) => handleUpdateSlidePosition(slide, e.target.value)}
                      className="px-2 py-1 border border-gray-200 rounded text-sm"
                    >
                      <option value="center">Orta</option>
                      <option value="bottom-left">Sol Alt</option>
                      <option value="bottom-right">Sağ Alt</option>
                      <option value="top-left">Sol Üst</option>
                      <option value="top-right">Sağ Üst</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={slide.show_text}
                      onChange={() => handleToggleSlideText(slide)}
                      className="rounded border-gray-300"
                    />
                    <span>Metin Göster</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSlide(slide)}
                  className={`p-2 rounded-lg ${slide.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                  title={slide.is_active ? 'Pasif Yap' : 'Aktif Yap'}
                >
                  {slide.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {heroSlides.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Henüz slayt eklenmemiş. Yukarıdaki butona tıklayarak yeni slayt ekleyin.
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Yeni Slayt Ekle</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-2" />
                    <p className="text-gray-600">Yükleniyor...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Resim yüklemek için tıklayın</p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF, WEBP (max 10MB)</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddStat}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni İstatistik
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`bg-white border rounded-lg p-4 ${!stat.is_active ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <select
                value={stat.icon}
                onChange={(e) => {
                  const updated = { ...stat, icon: e.target.value };
                  setStats(prev => prev.map(s => s.id === stat.id ? updated : s));
                  handleSaveStat(updated);
                }}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
              >
                {ICON_OPTIONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => handleToggleStat(stat)}
                  className={`p-1.5 rounded ${stat.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  {stat.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteStat(stat.id)}
                  className="p-1.5 rounded bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => setStats(prev => prev.map(s => s.id === stat.id ? { ...s, value: e.target.value } : s))}
                  onBlur={() => handleSaveStat(stat)}
                  placeholder="Değer (750+)"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => setStats(prev => prev.map(s => s.id === stat.id ? { ...s, label: e.target.value } : s))}
                  onBlur={() => handleSaveStat(stat)}
                  placeholder="Etiket"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <input
                type="text"
                value={stat.description || ''}
                onChange={(e) => setStats(prev => prev.map(s => s.id === stat.id ? { ...s, description: e.target.value } : s))}
                onBlur={() => handleSaveStat(stat)}
                placeholder="Açıklama"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWhyUsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddWhyUs}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Özellik
        </button>
      </div>

      <div className="space-y-4">
        {whyUs.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-lg p-4 ${!item.is_active ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <select
                value={item.icon}
                onChange={(e) => {
                  const updated = { ...item, icon: e.target.value };
                  setWhyUs(prev => prev.map(w => w.id === item.id ? updated : w));
                  handleSaveWhyUs(updated);
                }}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
              >
                {ICON_OPTIONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => handleToggleWhyUs(item)}
                  className={`p-1.5 rounded ${item.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteWhyUs(item.id)}
                  className="p-1.5 rounded bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={item.title}
                onChange={(e) => setWhyUs(prev => prev.map(w => w.id === item.id ? { ...w, title: e.target.value } : w))}
                onBlur={() => handleSaveWhyUs(item)}
                placeholder="Başlık"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium"
              />
              <textarea
                rows={2}
                value={item.description || ''}
                onChange={(e) => setWhyUs(prev => prev.map(w => w.id === item.id ? { ...w, description: e.target.value } : w))}
                onBlur={() => handleSaveWhyUs(item)}
                placeholder="Açıklama"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">İçerik Yönetimi</h2>
        <p className="text-sm text-gray-500 mt-1">Ana sayfa içeriklerini yönetin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Menu */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {tabs.find(t => t.id === activeTab)?.name}
          </h3>

          {activeTab === 'hero' && renderHeroTab()}
          {activeTab === 'stats' && renderStatsTab()}
          {activeTab === 'whyus' && renderWhyUsTab()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Content;
