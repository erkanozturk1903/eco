import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroSolar from '@/assets/hero-solar.jpg';
import heroWind from '@/assets/hero-wind.jpg';
import heroBuilding from '@/assets/hero-building.jpg';

const HeroSection = () => {
  const heroImages = [heroSolar, heroWind, heroBuilding];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      style={{
        background: `linear-gradient(135deg, rgba(44, 95, 45, 0.88) 0%, rgba(44, 95, 45, 0.82) 50%, rgba(151, 188, 98, 0.78) 100%), url(${heroImages[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        transition: 'background 1s ease-in-out',
      }}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Türkiye'nin İlk{' '}
              <span className="text-secondary">TSRS-Native</span>
              {' '}ESG Platformu
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Karbon ayak izinizi ölçün, sürdürülebilir geleceğinizi inşa edin
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-body font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
              asChild
            >
              <Link to="/iletisim">
                Başlayın
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-body font-semibold text-lg px-8 py-6 transition-all duration-300"
              asChild
            >
              <Link to="/hizmetler">
                <Play className="mr-2 w-5 h-5" />
                Hizmetler
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="font-body text-sm">ISO 14064 Sertifikalı</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="font-body text-sm">TSRS Uyumlu</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="font-body text-sm">GRI Standartları</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
