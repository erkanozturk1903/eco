import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import MissionVision from '@/components/about/MissionVision';
import AboutCTA from '@/components/about/AboutCTA';

const About = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main className="pt-20">
        <AboutHero />
        <MissionVision />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
