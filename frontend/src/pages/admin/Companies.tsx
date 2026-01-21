import AdminLayout from '@/components/admin/AdminLayout';
import { Building2, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

const Companies = () => {
  const companies = [
    { id: 1, name: 'ABC Holding A.Ş.', sector: 'Enerji', projects: 3, status: 'active', contact: 'Ali Yılmaz' },
    { id: 2, name: 'XYZ Tekstil', sector: 'Tekstil', projects: 2, status: 'active', contact: 'Mehmet Demir' },
    { id: 3, name: 'DEF Enerji', sector: 'Enerji', projects: 1, status: 'pending', contact: 'Ayşe Kaya' },
    { id: 4, name: 'GHI Otomotiv', sector: 'Otomotiv', projects: 4, status: 'active', contact: 'Fatma Şahin' },
    { id: 5, name: 'JKL Gıda', sector: 'Gıda', projects: 2, status: 'inactive', contact: 'Hasan Çelik' },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Şirket Yönetimi</h2>
          <p className="text-sm text-gray-500 mt-1">Müşteri şirketleri görüntüleyin ve yönetin</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Yeni Şirket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Toplam Şirket</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Aktif Şirket</p>
          <p className="text-2xl font-bold text-green-600 mt-1">18</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Beklemede</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">6</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Şirket ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filtrele
        </button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.sector}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Projeler: <span className="font-medium text-gray-900">{company.projects}</span></span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  company.status === 'active' ? 'bg-green-100 text-green-700' :
                  company.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {company.status === 'active' ? 'Aktif' : company.status === 'pending' ? 'Beklemede' : 'Pasif'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">İletişim: {company.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Companies;
