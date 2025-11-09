import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactHeader from '@/components/contact/ContactHeader';
import ContactContent from '@/components/contact/ContactContent';
import ContactMap from '@/components/contact/ContactMap';

const Contact = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main className="pt-20">
        <ContactHeader />
        <ContactContent />
        <ContactMap />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
