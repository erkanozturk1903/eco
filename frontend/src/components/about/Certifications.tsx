const Certifications = () => {
  const certifications = [
    { name: 'GRI', fullName: 'Global Reporting Initiative' },
    { name: 'CDP', fullName: 'Carbon Disclosure Project' },
    { name: 'ISO 14064', fullName: 'Greenhouse Gas Accounting' },
    { name: 'TCFD', fullName: 'Task Force on Climate-related Financial Disclosures' },
    { name: 'SBTi', fullName: 'Science Based Targets initiative' },
    { name: 'TSRS', fullName: 'Türkiye Sürdürülebilirlik Raporlama Standartları' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Sertifikalar ve Ortaklıklar
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Uluslararası standartlarda hizmet kalitesi
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full aspect-square bg-white rounded-2xl border-2 border-border hover:border-primary flex items-center justify-center p-6 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-2">
                <div className="text-center">
                  <div className="font-heading font-bold text-2xl text-muted-foreground/40 group-hover:text-primary transition-colors duration-300 mb-2">
                    {cert.name}
                  </div>
                  <div className="font-body text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300">
                    {cert.fullName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="font-body text-muted-foreground max-w-3xl mx-auto">
            Tüm hizmetlerimiz uluslararası kabul görmüş standartlar ve metodolojiler 
            doğrultusunda sağlanmaktadır. Sürekli eğitim ve gelişim ile en güncel 
            bilgi ve teknolojileri müşterilerimize sunuyoruz.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
