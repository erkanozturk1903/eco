import AdminLayout from '@/components/admin/AdminLayout';
import { FolderKanban, Plus, Search, Filter, MoreHorizontal, Calendar } from 'lucide-react';

const Projects = () => {
  const projects = [
    { id: 1, name: 'ABC Holding ESG Raporu', company: 'ABC Holding A.Ş.', progress: 75, status: 'active', deadline: '15 Şubat 2026' },
    { id: 2, name: 'XYZ Tekstil Karbon Ayak İzi', company: 'XYZ Tekstil', progress: 40, status: 'active', deadline: '1 Mart 2026' },
    { id: 3, name: 'DEF Enerji Sürdürülebilirlik', company: 'DEF Enerji', progress: 90, status: 'review', deadline: '20 Ocak 2026' },
    { id: 4, name: 'GHI Otomotiv CSRD Uyumu', company: 'GHI Otomotiv', progress: 20, status: 'active', deadline: '30 Nisan 2026' },
    { id: 5, name: 'JKL Gıda Su Ayak İzi', company: 'JKL Gıda', progress: 100, status: 'completed', deadline: '10 Ocak 2026' },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Proje Yönetimi</h2>
          <p className="text-sm text-gray-500 mt-1">Tüm projeleri takip edin ve yönetin</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Yeni Proje
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Toplam</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Devam Eden</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">İncelemede</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">2</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Tamamlanan</p>
          <p className="text-2xl font-bold text-green-600 mt-1">2</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Proje ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filtrele
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  project.status === 'completed' ? 'bg-green-50' :
                  project.status === 'review' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  <FolderKanban className={`w-5 h-5 ${
                    project.status === 'completed' ? 'text-green-600' :
                    project.status === 'review' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {project.deadline}
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-700' :
                  project.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {project.status === 'completed' ? 'Tamamlandı' :
                   project.status === 'review' ? 'İncelemede' : 'Devam Ediyor'}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">İlerleme</span>
                <span className="font-medium text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    project.progress === 100 ? 'bg-green-500' :
                    project.progress >= 75 ? 'bg-blue-500' :
                    project.progress >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Projects;
