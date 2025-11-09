import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-6">
            Ekibimizle Tanışın
          </h2>
          <p className="font-body text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Sürdürülebilirlik yolculuğunuzda sizinle birlikte çalışmaktan mutluluk duyarız. 
            Hemen iletişime geçin, ücretsiz değerlendirme için randevu alın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-body font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
              asChild
            >
              <a href="#contact">
                <Mail className="mr-2 w-5 h-5" />
                İletişime Geçin
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-body font-semibold text-lg px-8 py-6 transition-all duration-300"
              asChild
            >
              <Link to="/hizmetler">
                Hizmetlerimiz
              </Link>
            </Button>
          </div>

          {/* Contact info */}
          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="font-body">info@ecoconsult.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="font-body">+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="font-body">Levent, İstanbul</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
