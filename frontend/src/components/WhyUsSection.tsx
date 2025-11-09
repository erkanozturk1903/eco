import { Shield, Sparkles, Users } from 'lucide-react';

const WhyUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "TSRS'ye Özel Platform",
      description: 'Türkiye Sürdürülebilirlik Raporlama Standartlarına özel geliştirilmiş tek platform. Yerel düzenlemelere tam uyum.',
      gradient: 'from-primary to-primary-light',
    },
    {
      icon: Sparkles,
      title: 'AI Destekli',
      description: 'Yapay zeka teknolojisi ile veri analizi, otomatik raporlama ve öngörücü modelleme. Süreçlerinizi hızlandırın.',
      gradient: 'from-secondary to-accent',
    },
    {
      icon: Users,
      title: 'Uzman Desteği',
      description: 'Deneyimli sürdürülebilirlik uzmanlarımız, stratejiden uygulamaya her aşamada yanınızda.',
      gradient: 'from-primary to-secondary',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Neden Bizi Seçmelisiniz?
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Türkiye'ye özel, teknoloji odaklı ESG çözümleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-border hover:-translate-y-2">
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="font-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-2xl transform rotate-12 -z-10`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
