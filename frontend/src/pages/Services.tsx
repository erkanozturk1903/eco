import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesBreadcrumb from '@/components/services/ServicesBreadcrumb';
import ServicesHeader from '@/components/services/ServicesHeader';
import ServicesGrid from '@/components/services/ServicesGrid';
import HowItWorks from '@/components/services/HowItWorks';
import ServicesCTA from '@/components/services/ServicesCTA';

const Services = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main className="pt-20">
        <ServicesBreadcrumb />
        <ServicesHeader />
        <ServicesGrid />
        <HowItWorks />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
