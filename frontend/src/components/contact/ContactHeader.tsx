const ContactHeader = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8 text-center animate-fade-in">
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
          Bizimle İletişime Geçin
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
          Sorularınızı yanıtlamak için buradayız. Size en kısa sürede dönüş yapacağız.
        </p>
      </div>
    </section>
  );
};

export default ContactHeader;
