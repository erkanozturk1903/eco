import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactContent = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form - 60% width (3 columns) */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Info - 40% width (2 columns) */}
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
