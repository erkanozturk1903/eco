import { useState, useEffect } from 'react';
import slayt1 from '@/assets/slayt1.png';
import slayt4 from '@/assets/slayt4.png';
import slayt5 from '@/assets/slayt5.png';
import slayt7 from '@/assets/slayt7.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { image: slayt1, textPosition: 'bottom-left' },
  { image: slayt4, textPosition: 'center' },
  { image: slayt5, textPosition: 'center' },
  { image: slayt7, textPosition: 'center' },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Text Overlay - Only show on slides 2, 3, 4 (not first slide) */}
      {currentSlide !== 0 && (
        <div
          className="relative z-20 container mx-auto px-4 lg:px-8 text-white max-w-6xl text-center transition-all duration-1000"
          style={{ marginTop: '-15vh' }}
        >
          <h1
            className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight animate-fade-in"
            style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            Sürdürülebilir bir gelecek için<br />
            insan, strateji ve teknoloji odaklı çözümler
          </h1>
          <p
            className="font-body text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in"
            style={{
              animationDelay: '0.2s',
              textShadow: '1px 1px 6px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.5)'
            }}
          >
            Her kurumun kendi kültüründen doğan, insandan güç alan, stratejiyle yön bulan ve teknolojiyle hız kazanan çözümler geliştiriyoruz.
          </p>
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
