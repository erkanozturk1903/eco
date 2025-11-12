import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import sustainImg from '@/assets/sustain.png';
import humanImg from '@/assets/human.png';
import socialImg from '@/assets/social.png';
import riskImg from '@/assets/risk.png';

const ServicesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      image: sustainImg,
      title: 'FERA SUSTAIN',
      subtitle: 'Sürdürülebilirlik Danışmanlığı',
      mission: 'Karşı karşıya olduğumuz iklim krizi çerçevesinde ülkeler bir takım yoğun tedbirler uygulamaktadır. Ülkemizin Paris İklim Anlaşmasının imzacısı olması ile birlikte, Kurumların sürdürülebilirlik gözetim ve denetimi için bir dizi mevzuat uygulamaya konulmuştur.',
      services: [
        'Sürdürülebilirlik Danışmanlığı: Kurumların sürdürülebilirlik strateji ve yol haritalarının oluşturulması',
        'Sürdürülebilirlik Raporlaması ve Denetimi: TSRS 1, TSRS 2, GRI, Sera Gazı Emisyon Envanteri, İklim Riskleri, Sürdürülebilirlik Kalkınma Amaçları Raporlaması',
        'Sürdürülebilirlik eğitimleri: Kurumsal sürdürülebilirlik hedeflerinin gerçekleştirilmesi için kurum içi aktörlerin bilinçlendirilmesi',
      ],
      gradient: 'from-emerald-500 to-teal-600',
      color: 'bg-emerald-500',
    },
    {
      image: humanImg,
      title: 'FERA HUMAN',
      subtitle: 'İnsan Kaynağı ve Liderlik Geliştirme',
      mission: 'Sürdürülebilirlik, liderlerin ve ekiplerin güçlü bir kültürde sürekli ve birlikte gelişmesi ile mümkündür. Fera Human liderlerin ve çalışanların gelişimi için eğitim ve koçluk hizmetleri sunar.',
      services: [
        'Kültür ve Tutundurma Çalışmaları',
        'Çalışan İyi Oluşu (well-being) Programları',
        'Pozitif ve Güçlendiren Liderlik Eğitimi',
        'Yetkinlik Eğitimleri',
        'Sürdürülebilirlik ve Kapsayıcılık Eğitimleri',
        'Yönetici ve Takım Koçluğu',
      ],
      gradient: 'from-blue-500 to-cyan-600',
      color: 'bg-blue-500',
    },
    {
      image: socialImg,
      title: 'FERA SOCIAL',
      subtitle: 'Sosyal Sorumluluk Danışmanlığı',
      mission: 'Sürdürülebilirlik faaliyetleri çerçevesinde sosyal sorumluluk projeleri kurumların marka değerlerini ve itibarlarını güçlendirmek ve çalışan bağlılığını artırmakta önemli bir rol oynamaktadır.',
      services: [
        'Sosyal sorumluluk projelerinin geliştirilmesine yönelik work-shoplar ve takım koçluğu',
        'Uygulama danışmanlığı',
        'SROI hesaplamaları ve raporlamaları',
      ],
      gradient: 'from-orange-500 to-amber-600',
      color: 'bg-orange-500',
    },
    {
      image: riskImg,
      title: 'FERA RISK MANAGEMENT',
      subtitle: 'Kurumsal Risk Yönetimi',
      mission: 'Kurumların karşılaşabileceği stratejik, finansal ve operasyonel risklerin değerlendirilmesi, risklerden korunması ve yeni fırsatlar yakalaması yönünde rehberlik yapmak.',
      services: [
        'Risk Yönetimi Organizasyon Yapısının Oluşturulması, Rol ve Sorumlulukların Belirlenmesi',
        'İşletmenin Kurumsal Risk Değerlendirmesinin Yapılması',
        'Kurumsal Risk Yönetimi Programının ve Politikalarının Oluşturulması',
        'Risk Komitesi Rapor Formatının Oluşturulması',
      ],
      gradient: 'from-red-600 to-purple-700',
      color: 'bg-red-600',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Morphing Cards Container */}
        <div className="flex gap-4 h-[600px] animate-fade-in">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative overflow-hidden rounded-3xl cursor-pointer
                  transition-all duration-700 ease-in-out
                  ${isHovered ? 'flex-[3]' : isAnyHovered ? 'flex-[0.7]' : 'flex-1'}
                `}
                style={{
                  boxShadow: isHovered
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-opacity duration-700 ${
                    isHovered ? 'opacity-90' : 'opacity-70'
                  }`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  {/* Title - Always Visible */}
                  <div className={`transition-all duration-700 ${
                    isHovered ? 'mb-6' : 'mb-0'
                  }`}>
                    <h3 className={`font-heading font-bold text-white transition-all duration-700 ${
                      isHovered ? 'text-4xl mb-3' : isAnyHovered ? 'text-xl' : 'text-3xl mb-2'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`font-body text-white/90 transition-all duration-700 ${
                      isHovered ? 'text-xl opacity-100' : 'text-base opacity-80'
                    } ${isAnyHovered && !isHovered ? 'opacity-0 h-0' : ''}`}>
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Expanded Content - Only on Hover */}
                  <div className={`transition-all duration-700 overflow-hidden ${
                    isHovered ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {/* Mission */}
                    <div className="mb-6">
                      <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-white/80 mb-2">
                        Misyonumuz
                      </h4>
                      <p className="font-body text-white/90 text-sm leading-relaxed line-clamp-3">
                        {service.mission}
                      </p>
                    </div>

                    {/* Services List */}
                    <div className="mb-6">
                      <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-white/80 mb-3">
                        Hizmetlerimiz
                      </h4>
                      <ul className="space-y-2">
                        {service.services.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                            <span className="font-body text-xs text-white/90 leading-relaxed line-clamp-1">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-white text-foreground hover:bg-white/90 font-body font-semibold group/btn transition-all duration-300"
                    >
                      Detaylı Bilgi
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Vertical Title for Collapsed State */}
                {isAnyHovered && !isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-heading font-bold text-white text-2xl transform -rotate-0 writing-mode-vertical text-center">
                      {service.title.split(' ').join('\n')}
                    </h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hint Text */}
        <p className="text-center mt-8 font-body text-muted-foreground text-sm animate-fade-in">
          Detayları görmek için kartların üzerine gelin
        </p>
      </div>
    </section>
  );
};

export default ServicesGrid;
