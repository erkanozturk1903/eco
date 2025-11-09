import { Search } from 'lucide-react';
import { useState } from 'react';

const ResourcesHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Sürdürülebilirlik Kaynakları
          </h1>
          <p className="font-body text-xl text-muted-foreground mb-8">
            ESG, TSRS ve sürdürülebilirlik konularında güncel bilgi ve rehberler
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Makaleler içinde ara..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-border rounded-xl font-body text-foreground focus:outline-none focus:border-primary transition-colors shadow-md"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHeader;
