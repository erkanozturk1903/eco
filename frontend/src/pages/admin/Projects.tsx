import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Projects = () => {
  return (
    <DashboardLayout title="Projeler">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Proje Yönetimi</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Proje
          </Button>
        </div>
        
        <Card className="p-6">
          <p className="text-muted-foreground text-center py-8">
            Henüz proje yok. Yeni proje eklemek için yukarıdaki butona tıklayın.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
