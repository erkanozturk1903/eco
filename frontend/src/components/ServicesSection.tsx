import { Card } from '@/components/ui/card';
import { Calculator, FileCheck, GitBranch, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: Calculator,
      title: 'Karbon Ayak İzi Hesaplama',
      description: 'ISO 14064 standardında detaylı karbon ayak izi analizi ve raporlama.',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      icon: FileCheck,
      title: 'TSRS Uyumluluk',
      description: 'Türkiye Sürdürülebilirlik Raporlama Standartlarına tam uyum desteği.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
    {
      icon: GitBranch,
      title: 'Tedarik Zinciri ESG',
      description: 'Tedarik zincirinizin çevresel ve sosyal performansını optimize edin.',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      icon: Target,
      title: 'Net Sıfır Stratejisi',
      description: 'Bilimsel hedefler doğrultusunda net sıfır emisyon yol haritası.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Hizmetlerimiz
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Sürdürülebilirlik yolculuğunuzda kapsamlı destek
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 bg-white border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${service.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <Link
                to="/hizmetler"
                className="inline-flex items-center font-body font-medium text-primary hover:text-primary-light transition-colors group"
              >
                Detaylı Bilgi
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
