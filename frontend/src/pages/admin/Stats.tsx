import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { Card } from '@/components/ui/card';

const Stats = () => {
  return (
    <DashboardLayout title="İstatistikler">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">İstatistikler</h1>
        
        <Card className="p-6">
          <p className="text-muted-foreground text-center py-8">
            İstatistik verileri yükleniyor...
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Stats;
