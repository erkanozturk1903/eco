import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Mail,
  Newspaper,
  Wrench,
  Users,
  Eye,
  Activity,
  ArrowUpRight,
  MailOpen,
  Loader2,
  Clock,
  Calendar
} from 'lucide-react';
import { dashboardApi } from '@/lib/api';

interface DashboardStats {
  messages: { total: number; unread: number };
  articles: { total: number; published: number; views: number };
  services: { total: number };
  team: { total: number };
}

interface RecentMessage {
  id: number;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  is_read: boolean;
  created_at: string;
}

interface RecentArticle {
  id: number;
  title: string;
  slug: string;
  is_published: boolean;
  views: number;
  created_at: string;
}

interface ActivityItem {
  type: string;
  title: string;
  description: string;
  timestamp: string;
  is_read: boolean;
}

const Dashboard = () => {
  const { fetchUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    fetchUser();
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, messagesRes, articlesRes, activityRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentMessages(5),
        dashboardApi.getRecentArticles(5),
        dashboardApi.getActivity(10)
      ]);
      setStats(statsRes.data);
      setRecentMessages(messagesRes.data);
      setRecentArticles(articlesRes.data);
      setActivity(activityRes.data);
    } catch (error) {
      console.error('Dashboard verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Az önce';
    if (diffMins < 60) return `${diffMins} dk önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString('tr-TR');
  };

  const statCards = stats ? [
    {
      name: 'Mesajlar',
      value: stats.messages.total.toString(),
      subValue: `${stats.messages.unread} okunmamış`,
      icon: Mail,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/admin/forms'
    },
    {
      name: 'Makaleler',
      value: stats.articles.total.toString(),
      subValue: `${stats.articles.published} yayında`,
      icon: Newspaper,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: '/admin/blog'
    },
    {
      name: 'Görüntüleme',
      value: stats.articles.views.toLocaleString(),
      subValue: 'toplam makale görüntüleme',
      icon: Eye,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/admin/blog'
    },
    {
      name: 'Hizmetler',
      value: stats.services.total.toString(),
      subValue: 'aktif hizmet',
      icon: Wrench,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/admin/services'
    },
  ] : [];

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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.link}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${stat.lightColor}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
              </div>
              <div className="mt-3">
                <span className="text-sm text-gray-500">{stat.subValue}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Son Mesajlar</h2>
              <Link to="/admin/forms" className="text-sm text-primary hover:underline flex items-center gap-1">
                Tümünü Gör
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Henüz mesaj yok</p>
              </div>
            ) : (
              recentMessages.map((message) => (
                <Link
                  key={message.id}
                  to="/admin/forms"
                  className={`block p-4 hover:bg-gray-50 transition-colors ${!message.is_read ? 'bg-blue-50/30' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.is_read ? 'bg-gray-100' : 'bg-blue-100'
                    }`}>
                      {message.is_read ? (
                        <MailOpen className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Mail className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm truncate ${!message.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {message.name}
                        </p>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatTimeAgo(message.created_at)}
                        </span>
                      </div>
                      {message.company && (
                        <p className="text-xs text-gray-500">{message.company}</p>
                      )}
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {message.subject || 'İletişim formu mesajı'}
                      </p>
                    </div>
                    {!message.is_read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Son Makaleler</h2>
              <Newspaper className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {recentArticles.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Henüz makale yok</p>
              </div>
            ) : (
              recentArticles.map((article) => (
                <Link
                  key={article.id}
                  to="/admin/blog"
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          article.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {article.is_published ? 'Yayında' : 'Taslak'}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="p-4 border-t border-gray-100">
            <Link
              to="/admin/blog"
              className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              + Yeni Makale
            </Link>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="p-4">
          {activity.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Henüz aktivite yok</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activity.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.type === 'message' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {item.type === 'message' ? (
                      <Mail className={`w-4 h-4 ${item.is_read ? 'text-blue-400' : 'text-blue-600'}`} />
                    ) : (
                      <Newspaper className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Hızlı İşlemler</h3>
            <p className="text-white/80 text-sm mt-1">Sık kullanılan işlemlere hızlıca erişin</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/blog" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              + Blog Yazısı
            </Link>
            <Link to="/admin/services" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              + Hizmet
            </Link>
            <Link to="/admin/about" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              + Ekip Üyesi
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
