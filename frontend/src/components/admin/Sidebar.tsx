import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  FolderKanban, 
  Target, 
  BarChart3, 
  Users, 
  Settings, 
  UserCog,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Form Gönderileri', url: '/admin/forms', icon: FileText, badge: 0 },
  { title: 'Firmalar', url: '/admin/companies', icon: Building2 },
  { title: 'Projeler', url: '/admin/projects', icon: FolderKanban },
  { title: 'Hizmetler', url: '/admin/services', icon: Target },
  { title: 'İstatistikler', url: '/admin/stats', icon: BarChart3 },
  { title: 'Ekip', url: '/admin/team', icon: Users },
  { title: 'Blog', url: '/admin/blog', icon: FileText },
  { title: 'Site Ayarları', url: '/admin/settings', icon: Settings },
  { title: 'Kullanıcılar', url: '/admin/users', icon: UserCog },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Çıkış yapıldı',
        description: 'Başarıyla çıkış yaptınız.',
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Çıkış yapılırken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sidebar className="border-r bg-[#1F2937]" collapsible="icon">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌱</div>
            {state === 'expanded' && (
              <span className="text-white font-semibold text-lg">Admin Panel</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          {state === 'expanded' && (
            <SidebarGroupLabel className="text-gray-400 uppercase text-xs px-6 py-4">
              Menü
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 text-gray-300 transition-colors ${
                          isActive
                            ? 'bg-[#2C5F2D] text-white font-medium'
                            : 'hover:bg-white/5'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state === 'expanded' && (
                        <span className="flex-1">{item.title}</span>
                      )}
                      {state === 'expanded' && item.badge !== undefined && item.badge > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full rounded-md"
          >
            <LogOut className="h-5 w-5" />
            {state === 'expanded' && <span>Çıkış Yap</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
