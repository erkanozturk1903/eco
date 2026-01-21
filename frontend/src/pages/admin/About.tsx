import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  FileText, Users, Award, Flag, Plus, Trash2, Eye, EyeOff,
  Save, Loader2, X, Upload, Edit2
} from 'lucide-react';
import { aboutApi, uploadApi, getUploadUrl } from '@/lib/api';

type TabType = 'content' | 'team' | 'certifications' | 'milestones';

interface AboutContent {
  id: number;
  section: string;
  title: string;
  content: string;
}

interface TeamMember {
  id: number;
  name: string;
  title: string;
  photo_url: string | null;
  linkedin_url: string | null;
  bio: string | null;
  order: number;
  is_active: boolean;
}

interface Certification {
  id: number;
  short_name: string;
  full_name: string;
  logo_url: string | null;
  description: string | null;
  order: number;
  is_active: boolean;
}

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  order: number;
  is_active: boolean;
}

const ICON_OPTIONS = [
  'Flag', 'Users', 'Rocket', 'Globe', 'Award', 'Target', 'Star',
  'TrendingUp', 'Building2', 'CheckCircle', 'Heart', 'Zap'
];

const COLOR_OPTIONS = [
  { value: 'emerald', label: 'Yeşil' },
  { value: 'blue', label: 'Mavi' },
  { value: 'purple', label: 'Mor' },
  { value: 'orange', label: 'Turuncu' },
  { value: 'red', label: 'Kırmızı' },
  { value: 'pink', label: 'Pembe' },
];

const About = () => {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [aboutContent, setAboutContent] = useState<AboutContent[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const tabs = [
    { id: 'content' as TabType, name: 'Hakkımızda İçeriği', icon: FileText },
    { id: 'team' as TabType, name: 'Ekip', icon: Users },
    { id: 'certifications' as TabType, name: 'Sertifikalar', icon: Award },
    { id: 'milestones' as TabType, name: 'Kilometre Taşları', icon: Flag },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await aboutApi.getPage();
      setAboutContent(response.data.content);
      setTeam(response.data.team);
      setCertifications(response.data.certifications);
      setMilestones(response.data.milestones);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Content handlers
  const handleSaveContent = async (item: AboutContent) => {
    try {
      setSaving(true);
      await aboutApi.updateContent(item.id, { title: item.title, content: item.content });
    } catch (error) {
      console.error('İçerik kaydedilirken hata:', error);
    } finally {
      setSaving(false);
    }
  };

  // Team handlers
  const handleAddTeamMember = async () => {
    try {
      const newMember = {
        name: 'Yeni Üye',
        title: 'Pozisyon',
        order: team.length,
        is_active: true
      };
      const response = await aboutApi.createTeamMember(newMember);
      setTeam(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Üye eklenirken hata:', error);
    }
  };

  const handleUpdateTeamMember = async (member: TeamMember) => {
    try {
      await aboutApi.updateTeamMember(member.id, member);
    } catch (error) {
      console.error('Üye güncellenirken hata:', error);
    }
  };

  const handleToggleTeamMember = async (member: TeamMember) => {
    try {
      await aboutApi.updateTeamMember(member.id, { is_active: !member.is_active });
      setTeam(prev => prev.map(m => m.id === member.id ? { ...m, is_active: !m.is_active } : m));
    } catch (error) {
      console.error('Üye güncellenirken hata:', error);
    }
  };

  const handleDeleteTeamMember = async (id: number) => {
    if (!confirm('Bu üyeyi silmek istediğinize emin misiniz?')) return;
    try {
      await aboutApi.deleteTeamMember(id);
      setTeam(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Üye silinirken hata:', error);
    }
  };

  const handleUploadPhoto = async (memberId: number, file: File) => {
    try {
      setUploading(true);
      const response = await uploadApi.uploadImage(file);
      await aboutApi.updateTeamMember(memberId, { photo_url: response.data.url });
      setTeam(prev => prev.map(m => m.id === memberId ? { ...m, photo_url: response.data.url } : m));
    } catch (error) {
      console.error('Fotoğraf yüklenirken hata:', error);
    } finally {
      setUploading(false);
    }
  };

  // Certification handlers
  const handleAddCertification = async () => {
    try {
      const newCert = {
        short_name: 'YENİ',
        full_name: 'Yeni Sertifika',
        order: certifications.length,
        is_active: true
      };
      const response = await aboutApi.createCertification(newCert);
      setCertifications(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Sertifika eklenirken hata:', error);
    }
  };

  const handleUpdateCertification = async (cert: Certification) => {
    try {
      await aboutApi.updateCertification(cert.id, cert);
    } catch (error) {
      console.error('Sertifika güncellenirken hata:', error);
    }
  };

  const handleToggleCertification = async (cert: Certification) => {
    try {
      await aboutApi.updateCertification(cert.id, { is_active: !cert.is_active });
      setCertifications(prev => prev.map(c => c.id === cert.id ? { ...c, is_active: !c.is_active } : c));
    } catch (error) {
      console.error('Sertifika güncellenirken hata:', error);
    }
  };

  const handleDeleteCertification = async (id: number) => {
    if (!confirm('Bu sertifikayı silmek istediğinize emin misiniz?')) return;
    try {
      await aboutApi.deleteCertification(id);
      setCertifications(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Sertifika silinirken hata:', error);
    }
  };

  // Milestone handlers
  const handleAddMilestone = async () => {
    try {
      const newMilestone = {
        year: new Date().getFullYear().toString(),
        title: 'Yeni Kilometre Taşı',
        icon: 'Flag',
        color: 'emerald',
        order: milestones.length,
        is_active: true
      };
      const response = await aboutApi.createMilestone(newMilestone);
      setMilestones(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Kilometre taşı eklenirken hata:', error);
    }
  };

  const handleUpdateMilestone = async (milestone: Milestone) => {
    try {
      await aboutApi.updateMilestone(milestone.id, milestone);
    } catch (error) {
      console.error('Kilometre taşı güncellenirken hata:', error);
    }
  };

  const handleToggleMilestone = async (milestone: Milestone) => {
    try {
      await aboutApi.updateMilestone(milestone.id, { is_active: !milestone.is_active });
      setMilestones(prev => prev.map(m => m.id === milestone.id ? { ...m, is_active: !m.is_active } : m));
    } catch (error) {
      console.error('Kilometre taşı güncellenirken hata:', error);
    }
  };

  const handleDeleteMilestone = async (id: number) => {
    if (!confirm('Bu kilometre taşını silmek istediğinize emin misiniz?')) return;
    try {
      await aboutApi.deleteMilestone(id);
      setMilestones(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Kilometre taşı silinirken hata:', error);
    }
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      {aboutContent.map((item) => (
        <div key={item.id} className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 capitalize">{item.section}</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => setAboutContent(prev => prev.map(c => c.id === item.id ? { ...c, title: e.target.value } : c))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
              <textarea
                rows={4}
                value={item.content}
                onChange={(e) => setAboutContent(prev => prev.map(c => c.id === item.id ? { ...c, content: e.target.value } : c))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
            <button
              onClick={() => handleSaveContent(item)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Kaydet
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddTeamMember}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Üye
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member) => (
          <div
            key={member.id}
            className={`bg-white border rounded-lg p-4 ${!member.is_active ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                  {member.photo_url ? (
                    <img src={getUploadUrl(member.photo_url)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 p-1.5 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90">
                  <Upload className="w-3 h-3" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleUploadPhoto(member.id, e.target.files[0])}
                  />
                </label>
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => setTeam(prev => prev.map(m => m.id === member.id ? { ...m, name: e.target.value } : m))}
                  onBlur={() => handleUpdateTeamMember(member)}
                  placeholder="İsim"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium"
                />
                <input
                  type="text"
                  value={member.title}
                  onChange={(e) => setTeam(prev => prev.map(m => m.id === member.id ? { ...m, title: e.target.value } : m))}
                  onBlur={() => handleUpdateTeamMember(member)}
                  placeholder="Pozisyon"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={member.linkedin_url || ''}
                  onChange={(e) => setTeam(prev => prev.map(m => m.id === member.id ? { ...m, linkedin_url: e.target.value } : m))}
                  onBlur={() => handleUpdateTeamMember(member)}
                  placeholder="LinkedIn URL"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleToggleTeamMember(member)}
                  className={`p-1.5 rounded ${member.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  {member.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteTeamMember(member.id)}
                  className="p-1.5 rounded bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-3">
              <textarea
                rows={2}
                value={member.bio || ''}
                onChange={(e) => setTeam(prev => prev.map(m => m.id === member.id ? { ...m, bio: e.target.value } : m))}
                onBlur={() => handleUpdateTeamMember(member)}
                placeholder="Kısa biyografi"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddCertification}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Sertifika
        </button>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`bg-white border rounded-lg p-4 ${!cert.is_active ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={cert.short_name}
                  onChange={(e) => setCertifications(prev => prev.map(c => c.id === cert.id ? { ...c, short_name: e.target.value } : c))}
                  onBlur={() => handleUpdateCertification(cert)}
                  placeholder="Kısa İsim (ISO 14001)"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium"
                />
                <input
                  type="text"
                  value={cert.full_name}
                  onChange={(e) => setCertifications(prev => prev.map(c => c.id === cert.id ? { ...c, full_name: e.target.value } : c))}
                  onBlur={() => handleUpdateCertification(cert)}
                  placeholder="Tam İsim"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="flex gap-1 ml-3">
                <button
                  onClick={() => handleToggleCertification(cert)}
                  className={`p-1.5 rounded ${cert.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  {cert.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteCertification(cert.id)}
                  className="p-1.5 rounded bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              rows={2}
              value={cert.description || ''}
              onChange={(e) => setCertifications(prev => prev.map(c => c.id === cert.id ? { ...c, description: e.target.value } : c))}
              onBlur={() => handleUpdateCertification(cert)}
              placeholder="Açıklama"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderMilestonesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddMilestone}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Kilometre Taşı
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`bg-white border rounded-lg p-4 ${!milestone.is_active ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={milestone.year}
                  onChange={(e) => setMilestones(prev => prev.map(m => m.id === milestone.id ? { ...m, year: e.target.value } : m))}
                  onBlur={() => handleUpdateMilestone(milestone)}
                  placeholder="Yıl"
                  className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm font-bold text-center"
                />
                <select
                  value={milestone.icon || 'Flag'}
                  onChange={(e) => {
                    const updated = { ...milestone, icon: e.target.value };
                    setMilestones(prev => prev.map(m => m.id === milestone.id ? updated : m));
                    handleUpdateMilestone(updated);
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {ICON_OPTIONS.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <select
                  value={milestone.color || 'emerald'}
                  onChange={(e) => {
                    const updated = { ...milestone, color: e.target.value };
                    setMilestones(prev => prev.map(m => m.id === milestone.id ? updated : m));
                    handleUpdateMilestone(updated);
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {COLOR_OPTIONS.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleToggleMilestone(milestone)}
                  className={`p-1.5 rounded ${milestone.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  {milestone.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteMilestone(milestone.id)}
                  className="p-1.5 rounded bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={milestone.title}
                onChange={(e) => setMilestones(prev => prev.map(m => m.id === milestone.id ? { ...m, title: e.target.value } : m))}
                onBlur={() => handleUpdateMilestone(milestone)}
                placeholder="Başlık"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium"
              />
              <textarea
                rows={2}
                value={milestone.description || ''}
                onChange={(e) => setMilestones(prev => prev.map(m => m.id === milestone.id ? { ...m, description: e.target.value } : m))}
                onBlur={() => handleUpdateMilestone(milestone)}
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Hakkımızda Yönetimi</h2>
        <p className="text-sm text-gray-500 mt-1">Hakkımızda sayfası içeriklerini yönetin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {tabs.find(t => t.id === activeTab)?.name}
          </h3>

          {activeTab === 'content' && renderContentTab()}
          {activeTab === 'team' && renderTeamTab()}
          {activeTab === 'certifications' && renderCertificationsTab()}
          {activeTab === 'milestones' && renderMilestonesTab()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default About;
