import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WhyUsSection from '@/components/WhyUsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main>
        <HeroSection />
        <WhyUsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
