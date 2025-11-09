import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from '@/components/WhyUsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <WhyUsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
