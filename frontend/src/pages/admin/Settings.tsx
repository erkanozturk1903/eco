import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Settings as SettingsIcon, Globe, Mail, Share2, Save, Loader2, Check } from 'lucide-react';
import { settingsApi } from '@/lib/api';

type TabType = 'general' | 'contact' | 'social';

interface SettingsData {
  general: Record<string, string>;
  contact: Record<string, string>;
  social: Record<string, string>;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [settings, setSettings] = useState<SettingsData>({
    general: {},
    contact: {},
    social: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'general' as TabType, name: 'Genel Ayarlar', icon: Globe },
    { id: 'contact' as TabType, name: 'İletişim', icon: Mail },
    { id: 'social' as TabType, name: 'Sosyal Medya', icon: Share2 },
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.getAll();
      setSettings(response.data);
    } catch (error) {
      console.error('Ayarlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (category: TabType, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Save all categories
      await Promise.all([
        settingsApi.updateGeneral(settings.general),
        settingsApi.updateContact(settings.contact),
        settingsApi.updateSocial(settings.social),
      ]);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error);
      alert('Ayarlar kaydedilirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Şirket Adı</label>
        <input
          type="text"
          value={settings.general.company_name || ''}
          onChange={(e) => handleChange('general', 'company_name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
        <input
          type="text"
          value={settings.general.logo_url || ''}
          onChange={(e) => handleChange('general', 'logo_url', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
        <input
          type="text"
          value={settings.general.tagline || ''}
          onChange={(e) => handleChange('general', 'tagline', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Footer Metni</label>
        <textarea
          rows={3}
          value={settings.general.footer_text || ''}
          onChange={(e) => handleChange('general', 'footer_text', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Telif Hakkı Metni</label>
        <input
          type="text"
          value={settings.general.copyright_text || ''}
          onChange={(e) => handleChange('general', 'copyright_text', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
        <input
          type="email"
          value={settings.contact.email || ''}
          onChange={(e) => handleChange('contact', 'email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon 1</label>
          <input
            type="tel"
            value={settings.contact.phone1 || ''}
            onChange={(e) => handleChange('contact', 'phone1', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon 2</label>
          <input
            type="tel"
            value={settings.contact.phone2 || ''}
            onChange={(e) => handleChange('contact', 'phone2', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
        <textarea
          rows={3}
          value={settings.contact.address || ''}
          onChange={(e) => handleChange('contact', 'address', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Saatleri</label>
        <input
          type="text"
          value={settings.contact.working_hours || ''}
          onChange={(e) => handleChange('contact', 'working_hours', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="Örn: Pazartesi-Cuma, 09:00-18:00"
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
        <input
          type="url"
          value={settings.social.linkedin_url || ''}
          onChange={(e) => handleChange('social', 'linkedin_url', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="https://linkedin.com/company/..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
        <input
          type="url"
          value={settings.social.twitter_url || ''}
          onChange={(e) => handleChange('social', 'twitter_url', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="https://twitter.com/..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
        <input
          type="url"
          value={settings.social.instagram_url || ''}
          onChange={(e) => handleChange('social', 'instagram_url', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="https://instagram.com/..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
        <input
          type="url"
          value={settings.social.facebook_url || ''}
          onChange={(e) => handleChange('social', 'facebook_url', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="https://facebook.com/..."
        />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Site Ayarları</h2>
          <p className="text-sm text-gray-500 mt-1">Genel site ayarlarını yönetin</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi!' : 'Kaydet'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
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

        {/* Settings Content */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {tabs.find(t => t.id === activeTab)?.name}
          </h3>

          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'contact' && renderContactSettings()}
          {activeTab === 'social' && renderSocialSettings()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
