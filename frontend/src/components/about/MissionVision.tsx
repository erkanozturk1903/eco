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
                  Türkiye'deki işletmelerin sürdürülebilirlik dönüşümünde güvenilir 
                  ortağı olmak ve çevresel ayak izlerini azaltmalarına öncülük etmek.
                </p>
                <p>
                  Yapay zeka destekli teknolojilerimiz ve uzman kadromuzla, şirketlerin 
                  TSRS standartlarına uygun raporlama yapmalarını sağlamak ve karbon 
                  nötr hedeflerine ulaşmalarında rehberlik etmek.
                </p>
                <p>
                  Her ölçekteki işletmeye erişilebilir, şeffaf ve etkili ESG çözümleri 
                  sunarak Türkiye'nin sürdürülebilir kalkınma hedeflerine katkıda bulunmak.
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
                  2030 yılına kadar Türkiye'nin en güvenilir ve kapsamlı sürdürülebilirlik 
                  platformu olmak ve 5,000'den fazla şirkete hizmet vermek.
                </p>
                <p>
                  Bölgenin ESG dönüşümünde lider konumda bulunmak ve teknoloji odaklı 
                  çözümlerimizle uluslararası arenada Türkiye'yi temsil etmek.
                </p>
                <p>
                  Sürdürülebilirlik raporlamasını tüm sektörler için standart hale 
                  getirmek ve Türkiye'nin karbon nötr ekonomiye geçişini hızlandırmak.
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
