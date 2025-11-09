import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  return (
    <DashboardLayout title="Site Ayarları">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Site Ayarları</h1>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Genel</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="contact">İletişim</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card className="p-6">
              <p className="text-muted-foreground">Genel site ayarları...</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo">
            <Card className="p-6">
              <p className="text-muted-foreground">SEO ayarları...</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card className="p-6">
              <p className="text-muted-foreground">İletişim ayarları...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
