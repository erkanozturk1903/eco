import { Mail, Phone, MapPin, Clock, Linkedin, Twitter } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Mail,
      label: 'E-posta',
      value: 'info@feradanismanlik.com.tr',
      href: 'mailto:info@feradanismanlik.com.tr',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '+90 530 976 7938 / +90 532 431 1675',
      href: 'tel:+905309767938',
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
    {
      icon: MapPin,
      label: 'Adres',
      value: 'Merkez Mahallesi Mülkiye Sokak Nexonya Köyiçi Evleri A Bl D:14 Çekmeköy İstanbul',
      href: null,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      icon: Clock,
      label: 'Çalışma Saatleri',
      value: 'Pazartesi-Cuma, 09:00-18:00',
      href: null,
      color: 'text-secondary',
      bgColor: 'bg-secondary/5',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
      color: 'hover:bg-primary',
    },
    {
      icon: Twitter,
      href: '#',
      label: 'Twitter',
      color: 'hover:bg-secondary',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {/* Contact Details Card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
        <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
          İletişim Bilgileri
        </h3>

        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`w-12 h-12 ${detail.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <detail.icon className={`w-6 h-6 ${detail.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-muted-foreground mb-1">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="font-body font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="font-body font-medium text-foreground">
                    {detail.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Card */}
      <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 shadow-lg text-white">
        <h3 className="font-heading font-bold text-2xl mb-4">
          Sosyal Medya
        </h3>
        <p className="font-body text-white/90 mb-6">
          Sürdürülebilirlik trendleri ve güncellemeler için bizi takip edin
        </p>
        
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110`}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Quick Response Card */}
      <div className="bg-muted/30 rounded-2xl p-6 border border-border">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse" />
          <div>
            <p className="font-body text-sm text-foreground">
              <span className="font-semibold">Hızlı Yanıt Garantisi:</span> Tüm mesajlarınıza 
              24 saat içinde dönüş yapıyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
