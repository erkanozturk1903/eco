import { DashboardLayout } from '@/components/admin/DashboardLayout';
import DashboardOverview from './admin/DashboardOverview';

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default Dashboard;
