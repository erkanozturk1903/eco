import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  LayoutDashboard,
  FileText,
  Building2,
  FolderKanban,
  Wrench,
  BarChart3,
  Users,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Leaf,
  LayoutGrid,
  Info
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'İçerikler', path: '/admin/content', icon: LayoutGrid },
  { name: 'Hakkımızda', path: '/admin/about', icon: Info },
  { name: 'Formlar', path: '/admin/forms', icon: FileText },
  { name: 'Şirketler', path: '/admin/companies', icon: Building2 },
  { name: 'Projeler', path: '/admin/projects', icon: FolderKanban },
  { name: 'Hizmetler', path: '/admin/services', icon: Wrench },
  { name: 'İstatistikler', path: '/admin/stats', icon: BarChart3 },
  { name: 'Takım', path: '/admin/team', icon: Users },
  { name: 'Blog', path: '/admin/blog', icon: Newspaper },
  { name: 'Kullanıcılar', path: '/admin/users', icon: Users },
  { name: 'Ayarlar', path: '/admin/settings', icon: Settings },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const currentPage = menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300
        ${sidebarOpen ? 'w-64' : 'w-20'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg text-gray-900">EcoConsult</span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                {sidebarOpen && (
                  <span className="font-medium truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content area */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{currentPage}</h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Yönetim Paneli
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {user?.full_name?.[0] || user?.email?.[0] || 'A'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                      {user?.full_name || 'Admin'}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">
                      {user?.email}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/admin/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Ayarlar
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Çıkış Yap
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
