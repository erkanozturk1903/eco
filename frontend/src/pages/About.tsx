import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import MissionVision from '@/components/about/MissionVision';
import TeamSection from '@/components/about/TeamSection';
import Certifications from '@/components/about/Certifications';
import AboutCTA from '@/components/about/AboutCTA';

const About = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main className="pt-20">
        <AboutHero />
        <OurStory />
        <MissionVision />
        <TeamSection />
        <Certifications />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
