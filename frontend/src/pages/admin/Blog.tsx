import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Blog = () => {
  return (
    <DashboardLayout title="Blog">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Blog Yönetimi</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Yazı
          </Button>
        </div>
        
        <Card className="p-6">
          <p className="text-muted-foreground text-center py-8">
            Henüz blog yazısı yok. Yeni yazı eklemek için yukarıdaki butona tıklayın.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
