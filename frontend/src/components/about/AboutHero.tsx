import teamPhoto from '@/assets/team-photo.jpg';

const AboutHero = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Sürdürülebilir Geleceği Birlikte İnşa Ediyoruz
            </h1>
            <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                EcoConsult, Türkiye'nin sürdürülebilirlik dönüşümünde öncü rol oynayan, 
                teknoloji odaklı bir danışmanlık platformudur. 2020 yılında kurulan şirketimiz, 
                işletmelerin çevresel, sosyal ve kurumsal yönetim (ESG) performanslarını 
                iyileştirmelerine yardımcı olmaktadır.
              </p>
              <p>
                Misyonumuz, Türkiye'deki şirketlerin karbon nötr hedeflerine ulaşmalarını 
                sağlamak ve sürdürülebilirlik raporlamasında küresel standartlara uyum 
                göstermelerini desteklemektir. Yapay zeka destekli platformumuz ve uzman 
                kadromuzla, her ölçekteki işletmeye özel çözümler sunuyoruz.
              </p>
              <p>
                750'den fazla şirketle çalışarak 3.5 milyon ton CO2e azaltımına katkıda 
                bulunduk ve Türkiye'nin sürdürülebilir geleceğine liderlik ediyoruz.
              </p>
            </div>
          </div>

          {/* Right: Team photo */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={teamPhoto}
                alt="EcoConsult Team"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
