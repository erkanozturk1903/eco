import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const companyLinks = [
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Ekibimiz', href: '/hakkimizda#team' },
    { name: 'Kariyer', href: '/hakkimizda' },
    { name: 'Blog', href: '/kaynaklar' },
  ];

  const serviceLinks = [
    { name: 'Karbon Ayak İzi', href: '/hizmetler' },
    { name: 'TSRS Uyumluluk', href: '/hizmetler' },
    { name: 'Tedarik Zinciri ESG', href: '/hizmetler' },
    { name: 'Net Sıfır Stratejisi', href: '/hizmetler' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl">Fera Danışmanlık</span>
            </Link>
            <p className="font-body text-white/70 leading-relaxed mb-6">
              Türkiye'nin sürdürülebilir geleceğini inşa eden öncü ESG danışmanlık platformu.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Şirket</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="font-body text-white/70 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Hizmetler</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="font-body text-white/70 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@feradanismanlik.com.tr"
                  className="font-body text-white/70 hover:text-secondary transition-colors duration-300"
                >
                  info@feradanismanlik.com.tr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div className="font-body text-white/70">
                  <a href="tel:+905309767938" className="hover:text-secondary transition-colors duration-300 block">
                    +90 530 976 7938
                  </a>
                  <a href="tel:+905324311675" className="hover:text-secondary transition-colors duration-300 block">
                    +90 532 431 1675
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="font-body text-white/70">
                  Merkez Mahallesi Mülkiye Sokak Nexonya Köyiçi Evleri A Bl D:14 Çekmeköy İstanbul
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/60 text-sm">
              © {new Date().getFullYear()} Fera Danışmanlık. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6">
              <Link
                to="/iletisim"
                className="font-body text-white/60 hover:text-secondary text-sm transition-colors duration-300"
              >
                Gizlilik Politikası
              </Link>
              <Link
                to="/iletisim"
                className="font-body text-white/60 hover:text-secondary text-sm transition-colors duration-300"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
