import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen font-body">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-24 text-center">
            <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
              Makale Bulunamadı
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              Aradığınız makale mevcut değil veya kaldırılmış olabilir.
            </p>
            <Button onClick={() => navigate('/kaynaklar')}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Kaynaklara Dön
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-body">
      <Navigation />
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={() => navigate('/kaynaklar')}
            className="group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kaynaklara Dön
          </Button>
        </div>

        {/* Article Header */}
        <div className="container mx-auto px-4 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <Badge className={`${article.categoryColor} font-body font-semibold mb-6`}>
              {article.category}
            </Badge>

            {/* Title */}
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="font-body text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-body">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="font-body">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-body">{article.readTime} okuma</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 lg:px-8 pb-24">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:font-body prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:my-6 prose-li:font-body prose-li:text-muted-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
            />

            {/* CTA Section */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white">
                <h3 className="font-heading font-bold text-2xl mb-3">
                  Destek İhtiyacınız mı Var?
                </h3>
                <p className="font-body text-white/90 mb-6">
                  TSRS raporlama sürecinizde profesyonel destek almak için bizimle iletişime geçin.
                </p>
                <Button
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate('/iletisim')}
                >
                  İletişime Geçin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
