import AdminLayout from '@/components/admin/AdminLayout';
import { BarChart3, TrendingUp, Users, Building2, FolderKanban, Eye } from 'lucide-react';

const Stats = () => {
  const monthlyStats = [
    { month: 'Oca', projects: 2, companies: 3 },
    { month: 'Şub', projects: 3, companies: 2 },
    { month: 'Mar', projects: 4, companies: 4 },
    { month: 'Nis', projects: 2, companies: 1 },
    { month: 'May', projects: 5, companies: 3 },
    { month: 'Haz', projects: 3, companies: 2 },
  ];

  const maxProjects = Math.max(...monthlyStats.map(s => s.projects));

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">İstatistikler</h2>
        <p className="text-sm text-gray-500 mt-1">Genel performans metrikleri</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Toplam Şirket</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <FolderKanban className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Toplam Proje</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ekip Üyesi</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Eye className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sayfa Görüntüleme</p>
              <p className="text-2xl font-bold text-gray-900">12.4K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Aylık Proje Sayısı</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-end justify-between h-48 gap-2">
            {monthlyStats.map((stat) => (
              <div key={stat.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary/80 rounded-t-lg transition-all hover:bg-primary"
                  style={{ height: `${(stat.projects / maxProjects) * 100}%` }}
                />
                <span className="text-xs text-gray-500">{stat.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Stats */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Büyüme Oranları</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Müşteri Artışı</span>
                <span className="text-sm font-medium text-green-600">+24%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full w-3/4 bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Proje Artışı</span>
                <span className="text-sm font-medium text-blue-600">+18%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full w-2/3 bg-blue-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Gelir Artışı</span>
                <span className="text-sm font-medium text-purple-600">+32%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full w-4/5 bg-purple-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Web Trafiği</span>
                <span className="text-sm font-medium text-orange-600">+45%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full w-11/12 bg-orange-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Stats;
