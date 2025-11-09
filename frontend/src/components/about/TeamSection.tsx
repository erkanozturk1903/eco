import { Linkedin } from 'lucide-react';
import teamMember1 from '@/assets/team-member-1.jpg';
import teamMember2 from '@/assets/team-member-2.jpg';
import teamMember3 from '@/assets/team-member-3.jpg';
import teamMember4 from '@/assets/team-member-4.jpg';
import teamMember5 from '@/assets/team-member-5.jpg';
import teamMember6 from '@/assets/team-member-6.jpg';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Ayşe Demir',
      title: 'Kurucu & CEO',
      image: teamMember1,
      linkedin: '#',
    },
    {
      name: 'Mehmet Yılmaz',
      title: 'ESG Analiz Direktörü',
      image: teamMember2,
      linkedin: '#',
    },
    {
      name: 'Zeynep Kaya',
      title: 'Karbon Muhasebe Uzmanı',
      image: teamMember3,
      linkedin: '#',
    },
    {
      name: 'Can Öztürk',
      title: 'Sürdürülebilirlik Danışmanı',
      image: teamMember4,
      linkedin: '#',
    },
    {
      name: 'Elif Arslan',
      title: 'Veri Bilimci',
      image: teamMember5,
      linkedin: '#',
    },
    {
      name: 'Burak Şahin',
      title: 'Çevre Mühendisi',
      image: teamMember6,
      linkedin: '#',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Ekibimiz
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Sürdürülebilirlik alanında uzman, deneyimli profesyoneller
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border">
                {/* Photo */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* LinkedIn icon overlay */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white z-10"
                    aria-label={`${member.name} LinkedIn profili`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {member.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
