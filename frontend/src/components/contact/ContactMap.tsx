const ContactMap = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl text-foreground mb-4">
            Ofisimizi Ziyaret Edin
          </h2>
          <p className="font-body text-xl text-muted-foreground">
            İstanbul merkez ofisimizde sizleri ağırlamaktan mutluluk duyarız
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Google Maps Embed - Istanbul location */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96370.09321261279!2d28.94940555!3d41.0082376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab989753c5c97%3A0x68ddca2f6b81c498!2sLevent%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1234567890123!5m2!1sen!2str"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="EcoConsult Office Location - Levent, Istanbul"
          />
        </div>

        {/* Additional info */}
        <div className="mt-8 text-center">
          <p className="font-body text-muted-foreground">
            Görüşme öncesi randevu almanızı rica ederiz
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
