const ServicesHeader = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8 text-center animate-fade-in">
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
          Hizmetlerimiz
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Sürdürülebilir dönüşümün 4 temel boyutunda kapsamlı danışmanlık hizmetleri sunuyoruz.
          <br />
          <span className="text-primary font-semibold">FERA SUSTAIN, FERA HUMAN, FERA SOCIAL ve FERA RISK MANAGEMENT</span> ile kurumunuzun geleceğini inşa edin.
        </p>
      </div>
    </section>
  );
};

export default ServicesHeader;
