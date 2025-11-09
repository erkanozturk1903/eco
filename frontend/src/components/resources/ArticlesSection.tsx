import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import article1 from '@/assets/article-1.jpg';
import article2 from '@/assets/article-2.jpg';
import article3 from '@/assets/article-3.jpg';
import article4 from '@/assets/article-4.jpg';
import article5 from '@/assets/article-5.jpg';
import article6 from '@/assets/article-6.jpg';

const ArticlesSection = () => {
  const [visibleArticles, setVisibleArticles] = useState(9);

  const articles = [
    {
      image: article1,
      category: 'Karbon',
      categoryColor: 'bg-primary/10 text-primary',
      title: 'Karbon Ayak İzi Nasıl Hesaplanır?',
      excerpt: 'ISO 14064 standardına göre Scope 1, 2 ve 3 emisyonlarınızı hesaplama rehberi.',
      readTime: '5 dk',
      date: '10 Ocak 2024',
    },
    {
      image: article2,
      category: 'Net Sıfır',
      categoryColor: 'bg-secondary/10 text-secondary',
      title: 'Net Sıfır Hedefi Belirleme Rehberi',
      excerpt: 'Science Based Targets metodolojisi ile karbon nötr yol haritası oluşturun.',
      readTime: '7 dk',
      date: '8 Ocak 2024',
    },
    {
      image: article3,
      category: 'TSRS',
      categoryColor: 'bg-primary/10 text-primary',
      title: 'SKDM Nedir ve İşletmenizi Nasıl Etkiler?',
      excerpt: 'Sürdürülebilirlik Kurulu ve Düzenlemeleri Müdürlüğü\'nün yeni düzenlemeleri.',
      readTime: '6 dk',
      date: '5 Ocak 2024',
    },
    {
      image: article4,
      category: 'ESG',
      categoryColor: 'bg-secondary/10 text-secondary',
      title: 'Tedarik Zincirinde ESG Yönetimi',
      excerpt: 'Tedarikçilerinizin sürdürülebilirlik performansını değerlendirme yöntemleri.',
      readTime: '8 dk',
      date: '3 Ocak 2024',
    },
    {
      image: article5,
      category: 'Raporlama',
      categoryColor: 'bg-primary/10 text-primary',
      title: 'GRI Standartlarına Göre Raporlama',
      excerpt: 'Global Reporting Initiative çerçevesinde sürdürülebilirlik raporu hazırlama.',
      readTime: '10 dk',
      date: '28 Aralık 2023',
    },
    {
      image: article6,
      category: 'ESG',
      categoryColor: 'bg-secondary/10 text-secondary',
      title: 'Döngüsel Ekonomi Modelleri',
      excerpt: 'Atık yönetiminden değer yaratma ve döngüsel iş modelleri geliştirme.',
      readTime: '6 dk',
      date: '25 Aralık 2023',
    },
    {
      image: article1,
      category: 'Karbon',
      categoryColor: 'bg-primary/10 text-primary',
      title: 'İklim Riski Değerlendirmesi',
      excerpt: 'TCFD önerileri doğrultusunda iklim risklerini belirleme ve yönetme stratejileri.',
      readTime: '9 dk',
      date: '20 Aralık 2023',
    },
    {
      image: article2,
      category: 'TSRS',
      categoryColor: 'bg-primary/10 text-primary',
      title: 'Sürdürülebilirlik KPI\'ları Belirleme',
      excerpt: 'ESG performansınızı ölçmek için doğru göstergeleri seçme rehberi.',
      readTime: '5 dk',
      date: '18 Aralık 2023',
    },
    {
      image: article3,
      category: 'ESG',
      categoryColor: 'bg-secondary/10 text-secondary',
      title: 'Yeşil Finansman ve ESG Kredileri',
      excerpt: 'Sürdürülebilirlik bağlantılı finansman fırsatları ve başvuru süreci.',
      readTime: '7 dk',
      date: '15 Aralık 2023',
    },
    // Additional articles for "Load More" functionality
    {
      image: article4,
      category: 'Karbon',
      categoryColor: 'bg-primary/10 text-primary',
      title: 'Yenilenebilir Enerji Geçişi',
      excerpt: 'İşletmenizde yenilenebilir enerji kullanımına geçiş adımları ve faydaları.',
      readTime: '6 dk',
      date: '12 Aralık 2023',
    },
    {
      image: article5,
      category: 'ESG',
      categoryColor: 'bg-secondary/10 text-secondary',
      title: 'Sosyal Sorumluluk Projeleri',
      excerpt: 'ESG stratejinize entegre sosyal etki yaratma yöntemleri.',
      readTime: '8 dk',
      date: '10 Aralık 2023',
    },
    {
      image: article6,
      category: 'TSRS',
      categoryColor: 'bg-primary/10 text-primary',
      title: 'Paydaş Katılımı ve İletişimi',
      excerpt: 'Sürdürülebilirlik raporlamasında paydaş beklentilerini yönetme.',
      readTime: '5 dk',
      date: '8 Aralık 2023',
    },
  ];

  const handleLoadMore = () => {
    setVisibleArticles((prev) => Math.min(prev + 6, articles.length));
  };

  return (
    <div>
      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {articles.slice(0, visibleArticles).map((article, index) => (
          <a
            key={index}
            href="#"
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border h-full flex flex-col">
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${article.categoryColor} font-body font-semibold`}>
                    {article.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="font-body text-muted-foreground mb-4 leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-body">{article.readTime} okuma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body">{article.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {visibleArticles < articles.length && (
        <div className="text-center animate-fade-in">
          <Button
            onClick={handleLoadMore}
            size="lg"
            className="bg-primary hover:bg-primary-light font-body font-semibold px-12"
          >
            Daha Fazla Yükle
          </Button>
          <p className="font-body text-sm text-muted-foreground mt-4">
            {visibleArticles} / {articles.length} makale gösteriliyor
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;
