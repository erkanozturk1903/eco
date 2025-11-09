import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ResourcesHeader from '@/components/resources/ResourcesHeader';
import FeaturedArticle from '@/components/resources/FeaturedArticle';
import ArticlesSection from '@/components/resources/ArticlesSection';

const Resources = () => {
  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main className="pt-20">
        <ResourcesHeader />
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content - 8 columns */}
            <div className="lg:col-span-8">
              <FeaturedArticle />
              <ArticlesSection />
            </div>

            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                    Popüler Makaleler
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: 'TSRS 2024 Rehberi', views: '2.4k' },
                      { title: 'Karbon Ayak İzi Hesaplama', views: '1.8k' },
                      { title: 'Net Sıfır Stratejileri', views: '1.5k' },
                    ].map((article, index) => (
                      <a
                        key={index}
                        href="#"
                        className="flex items-start gap-3 group hover:bg-muted/30 p-2 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <span className="font-heading font-bold text-sm text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-body font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                          </p>
                          <p className="font-body text-xs text-muted-foreground mt-1">
                            {article.views} görüntülenme
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 shadow-lg text-white">
                  <h3 className="font-heading font-bold text-xl mb-3">
                    Haftalık Bülten
                  </h3>
                  <p className="font-body text-sm text-white/90 mb-4">
                    Sürdürülebilirlik trendleri ve güncellemelerini kaçırmayın
                  </p>
                  <input
                    type="email"
                    placeholder="Email adresiniz"
                    className="w-full px-4 py-3 rounded-lg font-body text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-primary hover:bg-white/90 font-body font-semibold py-3 rounded-lg transition-all duration-300">
                    Abone Ol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
