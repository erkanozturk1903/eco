import { Rocket, Users, Sparkles, Award } from 'lucide-react';

const OurStory = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Kuruluş',
      description: 'Türkiye\'nin ilk TSRS-native ESG platformu hayata geçirildi',
      icon: Rocket,
      color: 'from-primary to-primary-light',
    },
    {
      year: '2021',
      title: 'İlk 100 Müşteri',
      description: 'Farklı sektörlerden 100+ şirket ailemize katıldı',
      icon: Users,
      color: 'from-secondary to-accent',
    },
    {
      year: '2023',
      title: 'AI Platformu Lansmanı',
      description: 'Yapay zeka destekli karbon hesaplama ve raporlama sistemi devreye alındı',
      icon: Sparkles,
      color: 'from-primary to-secondary',
    },
    {
      year: '2024',
      title: 'TSRS Lideri',
      description: 'Türkiye\'nin en büyük TSRS uyumluluk danışmanlık şirketi olduk',
      icon: Award,
      color: 'from-secondary to-primary',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Hikayemiz
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Sürdürülebilirlik yolculuğumuzun dönüm noktaları
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-20" />

          <div className="space-y-12 md:space-y-24">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 items-center animate-fade-in ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Content card */}
                <div className="flex-1 w-full">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <milestone.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-heading font-bold text-3xl text-primary mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="font-heading font-semibold text-2xl text-foreground mb-3">
                          {milestone.title}
                        </h3>
                        <p className="font-body text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-lg z-10" />

                {/* Spacer for alternate layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
