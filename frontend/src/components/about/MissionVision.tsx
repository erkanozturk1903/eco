import { Target, Eye } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-border h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
                Misyonumuz
              </h2>

              <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                <p>
                  İş ortaklarımıza sürdürülebilir büyüme yolculuklarında rehberlik ederek; ekolojik
                  etkilerini ölçüp yönetmelerine, insan potansiyelini geliştirip güçlendirmelerine ve
                  finansal dayanıklılıklarını artırarak toplumsal değer yaratmalarına destek olmak.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-border h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
                Vizyonumuz
              </h2>
              
              <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                <p>
                  Her kurumun kendi kaynaklarını güçlendirerek sürdürülebilir kalkınmaya katkı sunduğu
                  bir gelecek için çalışmak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
