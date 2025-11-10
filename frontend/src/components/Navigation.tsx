import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Ana Sayfa', href: '/', isRoute: true },
    { name: 'Hizmetler', href: '/hizmetler', isRoute: true },
    { name: 'Hakkımızda', href: '/hakkimizda', isRoute: true },
    { name: 'Kaynaklar', href: '/kaynaklar', isRoute: true },
    { name: 'İletişim', href: '/iletisim', isRoute: true },
  ];

  const isActive = (href: string, isRoute: boolean) => {
    if (isRoute) {
      return location.pathname === href;
    }
    return false;
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/fera_logo.png"
              alt="Fera Danışmanlık"
              className="h-10 w-auto transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-heading font-bold text-xl text-foreground">
              Fera Danışmanlık
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-body transition-colors duration-300 relative group ${
                    isActive(item.href, item.isRoute)
                      ? 'text-primary font-semibold'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  <span className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive(item.href, item.isRoute) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-body text-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              )
            ))}
            <Button
              className="bg-primary hover:bg-primary-light font-body font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              asChild
            >
              <Link to="/iletisim">
                Ücretsiz Değerlendirme
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-body transition-colors duration-300 py-2 ${
                      isActive(item.href, item.isRoute)
                        ? 'text-primary font-semibold'
                        : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-body text-foreground hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <Button
                className="bg-primary hover:bg-primary-light font-body font-medium w-full mt-2"
                asChild
              >
                <Link to="/iletisim">
                  Ücretsiz Değerlendirme
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
