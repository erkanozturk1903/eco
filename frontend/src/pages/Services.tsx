import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesBreadcrumb from '@/components/services/ServicesBreadcrumb';
import ServicesGrid from '@/components/services/ServicesGrid';
import HowItWorks from '@/components/services/HowItWorks';

const Services = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main className="pt-20">
        <ServicesBreadcrumb />
        <ServicesGrid />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
