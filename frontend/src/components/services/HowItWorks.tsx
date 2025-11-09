import { FileSearch, Database, BarChart3, FileText, Headphones } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileSearch,
      number: '1',
      title: 'İlk Değerlendirme',
      description: 'Ücretsiz danışmanlık ile ihtiyaçlarınızı belirleriz',
    },
    {
      icon: Database,
      number: '2',
      title: 'Veri Toplama',
      description: 'Sistematik veri toplama ve doğrulama süreci',
    },
    {
      icon: BarChart3,
      number: '3',
      title: 'Analiz',
      description: 'AI destekli analiz ve karşılaştırmalı değerlendirme',
    },
    {
      icon: FileText,
      number: '4',
      title: 'Rapor',
      description: 'TSRS uyumlu kapsamlı sürdürülebilirlik raporu',
    },
    {
      icon: Headphones,
      number: '5',
      title: 'Destek',
      description: 'Sürekli iyileştirme ve uzman danışmanlık desteği',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Süreç Nasıl İşler?
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            5 adımda sürdürülebilirlik dönüşümü
          </p>
        </div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connection line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
          
          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step number circle */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-heading font-bold text-2xl shadow-lg relative z-10">
                    {step.number}
                  </div>
                </div>
                
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-white border-2 border-border rounded-xl flex items-center justify-center shadow-md">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex gap-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Left side: Number and line */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 flex-grow bg-gradient-to-b from-primary/30 to-secondary/30 mt-4" />
                )}
              </div>
              
              {/* Right side: Content */}
              <div className="flex-1 pb-8">
                <div className="bg-white rounded-xl p-6 border border-border shadow-md">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-body text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
