import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Wrench, Plus, Trash2, Eye, EyeOff, Save, Loader2, X,
  ListOrdered, Edit2, ChevronDown, ChevronUp
} from 'lucide-react';
import { servicesApi, uploadApi, getUploadUrl } from '@/lib/api';

type TabType = 'services' | 'process';

interface ServiceItem {
  id: number;
  description: string;
  order: number;
}

interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  mission: string | null;
  image_url: string | null;
  gradient: string | null;
  color: string | null;
  order: number;
  is_active: boolean;
  items: ServiceItem[];
}

interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string | null;
  icon: string | null;
  order: number;
  is_active: boolean;
}

const ICON_OPTIONS = [
  'Search', 'Target', 'Cog', 'LineChart', 'Rocket', 'Star',
  'CheckCircle', 'Zap', 'Shield', 'Award', 'TrendingUp', 'Users'
];

const COLOR_OPTIONS = [
  { value: 'emerald', label: 'Yeşil', gradient: 'from-emerald-500 to-teal-600' },
  { value: 'blue', label: 'Mavi', gradient: 'from-blue-500 to-indigo-600' },
  { value: 'purple', label: 'Mor', gradient: 'from-purple-500 to-pink-600' },
  { value: 'orange', label: 'Turuncu', gradient: 'from-orange-500 to-red-600' },
];

const ServicesManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const tabs = [
    { id: 'services' as TabType, name: 'Hizmetler', icon: Wrench },
    { id: 'process' as TabType, name: 'Süreç Adımları', icon: ListOrdered },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await servicesApi.getPage();
      setServices(response.data.services);
      setProcessSteps(response.data.process_steps);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Service handlers
  const handleAddService = async () => {
    try {
      const newService = {
        slug: 'yeni-hizmet-' + Date.now(),
        title: 'Yeni Hizmet',
        subtitle: 'Alt başlık',
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-600',
        order: services.length,
        is_active: true,
        items: []
      };
      const response = await servicesApi.create(newService);
      setServices(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Hizmet eklenirken hata:', error);
    }
  };

  const handleUpdateService = async (service: Service) => {
    try {
      await servicesApi.update(service.id, {
        slug: service.slug,
        title: service.title,
        subtitle: service.subtitle,
        mission: service.mission,
        image_url: service.image_url,
        gradient: service.gradient,
        color: service.color,
        order: service.order,
        is_active: service.is_active
      });
    } catch (error) {
      console.error('Hizmet güncellenirken hata:', error);
    }
  };

  const handleToggleService = async (service: Service) => {
    try {
      await servicesApi.update(service.id, { is_active: !service.is_active });
      setServices(prev => prev.map(s => s.id === service.id ? { ...s, is_active: !s.is_active } : s));
    } catch (error) {
      console.error('Hizmet güncellenirken hata:', error);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    try {
      await servicesApi.delete(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Hizmet silinirken hata:', error);
    }
  };

  const handleUpdateServiceItems = async (serviceId: number, items: { description: string; order: number }[]) => {
    try {
      const response = await servicesApi.updateItems(serviceId, items);
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, items: response.data } : s));
    } catch (error) {
      console.error('Hizmet öğeleri güncellenirken hata:', error);
    }
  };

  const handleAddServiceItem = (serviceId: number) => {
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          items: [...s.items, { id: -Date.now(), description: '', order: s.items.length }]
        };
      }
      return s;
    }));
  };

  const handleRemoveServiceItem = (serviceId: number, index: number) => {
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        const newItems = s.items.filter((_, i) => i !== index);
        return { ...s, items: newItems };
      }
      return s;
    }));
  };

  // Process Step handlers
  const handleAddProcessStep = async () => {
    try {
      const newStep = {
        number: String(processSteps.length + 1).padStart(2, '0'),
        title: 'Yeni Adım',
        description: 'Açıklama',
        icon: 'Star',
        order: processSteps.length,
        is_active: true
      };
      const response = await servicesApi.createProcessStep(newStep);
      setProcessSteps(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Adım eklenirken hata:', error);
    }
  };

  const handleUpdateProcessStep = async (step: ProcessStep) => {
    try {
      await servicesApi.updateProcessStep(step.id, step);
    } catch (error) {
      console.error('Adım güncellenirken hata:', error);
    }
  };

  const handleToggleProcessStep = async (step: ProcessStep) => {
    try {
      await servicesApi.updateProcessStep(step.id, { is_active: !step.is_active });
      setProcessSteps(prev => prev.map(s => s.id === step.id ? { ...s, is_active: !s.is_active } : s));
    } catch (error) {
      console.error('Adım güncellenirken hata:', error);
    }
  };

  const handleDeleteProcessStep = async (id: number) => {
    if (!confirm('Bu adımı silmek istediğinize emin misiniz?')) return;
    try {
      await servicesApi.deleteProcessStep(id);
      setProcessSteps(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Adım silinirken hata:', error);
    }
  };

  const renderServicesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddService}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Hizmet
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white border rounded-lg overflow-hidden ${!service.is_active ? 'opacity-60' : ''}`}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient || 'from-gray-400 to-gray-500'} flex items-center justify-center flex-shrink-0`}>
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => setServices(prev => prev.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))}
                      onBlur={() => handleUpdateService(service)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold"
                      placeholder="Başlık"
                    />
                    <input
                      type="text"
                      value={service.subtitle || ''}
                      onChange={(e) => setServices(prev => prev.map(s => s.id === service.id ? { ...s, subtitle: e.target.value } : s))}
                      onBlur={() => handleUpdateService(service)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="Alt Başlık"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={service.slug}
                      onChange={(e) => setServices(prev => prev.map(s => s.id === service.id ? { ...s, slug: e.target.value } : s))}
                      onBlur={() => handleUpdateService(service)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="slug (url-friendly)"
                    />
                    <select
                      value={service.color || 'emerald'}
                      onChange={(e) => {
                        const color = e.target.value;
                        const colorOption = COLOR_OPTIONS.find(c => c.value === color);
                        const updated = { ...service, color, gradient: colorOption?.gradient || service.gradient };
                        setServices(prev => prev.map(s => s.id === service.id ? updated : s));
                        handleUpdateService(updated);
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      {COLOR_OPTIONS.map(color => (
                        <option key={color.value} value={color.value}>{color.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Detayları Göster"
                  >
                    {expandedService === service.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleToggleService(service)}
                    className={`p-2 rounded-lg ${service.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                  >
                    {service.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {expandedService === service.id && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Misyon</label>
                  <textarea
                    rows={2}
                    value={service.mission || ''}
                    onChange={(e) => setServices(prev => prev.map(s => s.id === service.id ? { ...s, mission: e.target.value } : s))}
                    onBlur={() => handleUpdateService(service)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                    placeholder="Hizmet misyonu"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Hizmet Kalemleri</label>
                    <button
                      onClick={() => handleAddServiceItem(service.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      + Ekle
                    </button>
                  </div>
                  <div className="space-y-2">
                    {service.items.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm w-6">{index + 1}.</span>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            setServices(prev => prev.map(s => {
                              if (s.id === service.id) {
                                const newItems = [...s.items];
                                newItems[index] = { ...newItems[index], description: e.target.value };
                                return { ...s, items: newItems };
                              }
                              return s;
                            }));
                          }}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          placeholder="Hizmet kalemi açıklaması"
                        />
                        <button
                          onClick={() => handleRemoveServiceItem(service.id, index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleUpdateServiceItems(service.id, service.items.map((item, i) => ({ description: item.description, order: i })))}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90"
                  >
                    <Save className="w-4 h-4" />
                    Kalemleri Kaydet
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProcessTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddProcessStep}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Adım
        </button>
      </div>

      <div className="space-y-4">
        {processSteps.map((step) => (
          <div
            key={step.id}
            className={`bg-white border rounded-lg p-4 ${!step.is_active ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={step.number}
                  onChange={(e) => setProcessSteps(prev => prev.map(s => s.id === step.id ? { ...s, number: e.target.value } : s))}
                  onBlur={() => handleUpdateProcessStep(step)}
                  className="w-16 px-3 py-2 border border-gray-200 rounded-lg text-sm font-bold text-center"
                  placeholder="01"
                />
                <select
                  value={step.icon || 'Star'}
                  onChange={(e) => {
                    const updated = { ...step, icon: e.target.value };
                    setProcessSteps(prev => prev.map(s => s.id === step.id ? updated : s));
                    handleUpdateProcessStep(updated);
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {ICON_OPTIONS.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => setProcessSteps(prev => prev.map(s => s.id === step.id ? { ...s, title: e.target.value } : s))}
                  onBlur={() => handleUpdateProcessStep(step)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium"
                  placeholder="Adım Başlığı"
                />
                <textarea
                  rows={2}
                  value={step.description || ''}
                  onChange={(e) => setProcessSteps(prev => prev.map(s => s.id === step.id ? { ...s, description: e.target.value } : s))}
                  onBlur={() => handleUpdateProcessStep(step)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                  placeholder="Açıklama"
                />
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleToggleProcessStep(step)}
                  className={`p-2 rounded ${step.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  {step.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteProcessStep(step.id)}
                  className="p-2 rounded bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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
        <h2 className="text-xl font-semibold text-gray-900">Hizmet Yönetimi</h2>
        <p className="text-sm text-gray-500 mt-1">Sunulan hizmetleri ve süreç adımlarını yönetin</p>
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

          {activeTab === 'services' && renderServicesTab()}
          {activeTab === 'process' && renderProcessTab()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServicesManagement;
