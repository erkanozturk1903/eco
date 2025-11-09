import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import featuredImage from '@/assets/article-featured.jpg';

const FeaturedArticle = () => {
  return (
    <div className="mb-12 animate-fade-in">
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-border group hover:shadow-2xl transition-all duration-300">
        {/* Featured Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={featuredImage}
            alt="TSRS 2024 Rehberi"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Featured Badge */}
          <div className="absolute top-6 left-6">
            <Badge className="bg-primary text-white font-body font-semibold px-4 py-2 text-sm">
              ÖNERİLEN
            </Badge>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
              TSRS 2024 Rehberi: Bilmeniz Gerekenler
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
            Türkiye Sürdürülebilirlik Raporlama Standartları 2024 yılında yürürlüğe girdi. 
            Bu kapsamlı rehberde, TSRS'nin işletmeniz için ne anlama geldiğini, hangi 
            gereklilikleri yerine getirmeniz gerektiğini ve nasıl başlayabileceğinizi detaylı 
            olarak ele alıyoruz.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-body">Ayşe Demir</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-body">15 Ocak 2024</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="bg-primary hover:bg-primary-light font-body font-semibold group/btn">
              Devamını Oku
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
