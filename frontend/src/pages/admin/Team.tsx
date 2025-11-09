import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Team = () => {
  return (
    <DashboardLayout title="Ekip">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ekip Yönetimi</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Üye
          </Button>
        </div>
        
        <Card className="p-6">
          <p className="text-muted-foreground text-center py-8">
            Henüz ekip üyesi yok. Yeni üye eklemek için yukarıdaki butona tıklayın.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Team;
