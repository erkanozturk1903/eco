import { TrendingUp, Building2, CheckCircle2, Network } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Building2,
      value: '750+',
      label: 'Şirket',
      color: 'text-primary',
    },
    {
      icon: TrendingUp,
      value: '3.5M+',
      label: 'Ton CO2e Azaltım',
      color: 'text-secondary',
    },
    {
      icon: CheckCircle2,
      value: '%98',
      label: 'TSRS Uyum',
      color: 'text-primary',
    },
    {
      icon: Network,
      value: '50+',
      label: 'Sektör',
      color: 'text-secondary',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md group-hover:shadow-xl mb-4 transition-all duration-300 group-hover:scale-110">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-2">
                {stat.value}
              </div>
              <div className="font-body text-muted-foreground text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
