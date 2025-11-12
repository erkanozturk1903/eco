import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';

const ArticlesSection = () => {
  // Filter out the featured article (shown separately)
  const displayArticles = articles.filter(a => a.slug !== 'tsrs-2024-rehberi');
  const [visibleArticles, setVisibleArticles] = useState(9);

  const handleLoadMore = () => {
    setVisibleArticles((prev) => Math.min(prev + 6, displayArticles.length));
  };

  return (
    <div>
      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {displayArticles.slice(0, visibleArticles).map((article, index) => (
          <Link
            key={article.slug}
            to={`/kaynaklar/${article.slug}`}
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
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {visibleArticles < displayArticles.length && (
        <div className="text-center animate-fade-in">
          <Button
            onClick={handleLoadMore}
            size="lg"
            className="bg-primary hover:bg-primary-light font-body font-semibold px-12"
          >
            Daha Fazla Yükle
          </Button>
          <p className="font-body text-sm text-muted-foreground mt-4">
            {visibleArticles} / {displayArticles.length} makale gösteriliyor
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;
