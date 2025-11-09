import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesBreadcrumb = () => {
  return (
    <div className="bg-muted/30 py-4 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-2 text-sm font-body">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Ana Sayfa
          </Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">Hizmetler</span>
        </nav>
      </div>
    </div>
  );
};

export default ServicesBreadcrumb;
