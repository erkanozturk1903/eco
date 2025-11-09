import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  FileCheck, 
  GitBranch, 
  Target, 
  Shield, 
  GraduationCap 
} from 'lucide-react';

const ServicesGrid = () => {
  const services = [
    {
      icon: Calculator,
      title: 'Karbon Ayak İzi Hesaplama',
      description: 'ISO 14064 standardında Scope 1, 2 ve 3 emisyon hesaplamaları. Detaylı karbon envanteri ve doğrulama desteği ile tam şeffaflık.',
      price: '₺60,000',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      icon: FileCheck,
      title: 'TSRS Uyumluluk ve Raporlama',
      description: 'Türkiye Sürdürülebilirlik Raporlama Standartlarına tam uyum. GRI, SASB ve TCFD entegrasyonu ile kapsamlı raporlama.',
      price: '₺85,000',
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
    {
      icon: GitBranch,
      title: 'Tedarik Zinciri ESG',
      description: 'Tedarikçi değerlendirme, risk analizi ve sürdürülebilir satın alma stratejileri. Tedarik zincirinizi optimize edin.',
      price: '₺75,000',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      icon: Target,
      title: 'Net Sıfır Stratejisi',
      description: 'Science Based Targets (SBTi) uyumlu net sıfır emisyon yol haritası. Kısa, orta ve uzun vadeli hedefler ve eylem planları.',
      price: '₺120,000',
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
    {
      icon: Shield,
      title: 'Risk Yönetimi',
      description: 'İklim ve ESG risk analizi, senaryo planlama ve stres testleri. TCFD önerileri doğrultusunda kapsamlı risk değerlendirmesi.',
      price: '₺95,000',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      icon: GraduationCap,
      title: 'ESG Eğitimi',
      description: 'Yöneticiler ve çalışanlar için özelleştirilmiş ESG eğitim programları. Sürdürülebilirlik kültürünü kuruluşunuza yerleştirin.',
      price: '₺45,000',
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 bg-white border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${service.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="font-body text-muted-foreground mb-6 leading-relaxed min-h-[6rem]">
                {service.description}
              </p>
              
              <div className="mb-6">
                <p className="font-body text-sm text-muted-foreground mb-1">
                  Başlangıç fiyatı
                </p>
                <p className="font-heading font-bold text-2xl text-primary">
                  {service.price}
                  <span className="text-sm font-normal text-muted-foreground">'den başlayan fiyatlarla</span>
                </p>
              </div>
              
              <Button
                className="w-full bg-primary hover:bg-primary-light font-body font-medium transition-all duration-300"
              >
                Detaylı Bilgi
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
