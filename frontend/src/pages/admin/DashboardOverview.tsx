import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Building2, 
  FolderKanban, 
  Eye,
  TrendingUp,
  ArrowRight,
  Target,
  Settings,
  UserCog
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStats {
  newForms: number;
  activeCompanies: number;
  activeProjects: number;
  blogViews: number;
}

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    newForms: 0,
    activeCompanies: 0,
    activeProjects: 0,
    blogViews: 0,
  });
  const [recentForms, setRecentForms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('Admin');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Get user name
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (profile?.full_name) {
          setUserName(profile.full_name);
        }
      }

      // Fetch stats (mock data for now since tables don't exist yet)
      // In real implementation, these would fetch from actual tables
      setStats({
        newForms: 12,
        activeCompanies: 45,
        activeProjects: 8,
        blogViews: 2847,
      });

      // Fetch recent forms (mock data)
      setRecentForms([
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          company: 'ABC Şirket',
          service: 'Karbon Ayak İzi',
          status: 'new',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          name: 'Ayşe Demir',
          company: 'XYZ Ltd.',
          service: 'TSRS Uyumluluk',
          status: 'contacted',
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          name: 'Mehmet Kaya',
          company: 'DEF A.Ş.',
          service: 'ESG Raporlama',
          status: 'new',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700',
    };
    
    const labels = {
      new: 'Yeni',
      contacted: 'İletişimde',
      completed: 'Tamamlandı',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Az önce';
    if (diffHours < 24) return `${diffHours} saat önce`;
    return `${Math.floor(diffHours / 24)} gün önce`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleDateString('tr-TR', options);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-[hsl(120,37%,27%)] to-[hsl(82,45%,56%)] text-white border-0">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-2">Hoş geldiniz, {userName}</h1>
          <p className="text-white/90 mb-6">{getCurrentDateTime()}</p>
          <div className="flex gap-4">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/admin/forms')}
              className="bg-white text-green-900 hover:bg-white/90"
            >
              Yeni Form Görüntüle
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/reports')}
              className="border-white text-white hover:bg-white/10"
            >
              Rapor Oluştur
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Yeni Formlar
            </CardTitle>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.newForms}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12%</span> son haftaya göre
            </p>
            <p className="text-xs text-muted-foreground mt-1">Son 7 gün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aktif Firmalar
            </CardTitle>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeCompanies}</div>
            <p className="text-xs text-muted-foreground mt-4">Toplam firma sayısı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aktif Projeler
            </CardTitle>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <FolderKanban className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground mt-4">Devam eden projeler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Blog Görüntülenmeleri
            </CardTitle>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.blogViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-4">Toplam görüntülenme</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Forms */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Son Form Gönderileri</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin/forms')}
                className="gap-2"
              >
                Tümünü Gör <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentForms.map((form) => (
                <div 
                  key={form.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => navigate('/admin/forms')}
                >
                  <div className="flex-1">
                    <div className="font-medium">{form.name}</div>
                    <div className="text-sm text-muted-foreground">{form.company}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{form.service}</div>
                    {getStatusBadge(form.status)}
                    <div className="text-xs text-muted-foreground w-20 text-right">
                      {getRelativeTime(form.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/blog')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Yeni Blog Yazısı
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/services')}
            >
              <Target className="mr-2 h-4 w-4" />
              Hizmet Ekle
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Ayarları Düzenle
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/users')}
            >
              <UserCog className="mr-2 h-4 w-4" />
              Kullanıcı Yönetimi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
