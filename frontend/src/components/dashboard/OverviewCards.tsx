import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Briefcase, Users, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

const OverviewCards = () => {
  const [counts, setCounts] = useState({
    stats: 0,
    services: 0,
    team: 0,
    articles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [statsRes, servicesRes, teamRes, articlesRes] = await Promise.all([
          supabase.from('stats').select('*', { count: 'exact', head: true }),
          supabase.from('services').select('*', { count: 'exact', head: true }),
          supabase.from('team_members').select('*', { count: 'exact', head: true }),
          supabase.from('articles').select('*', { count: 'exact', head: true }),
        ]);

        setCounts({
          stats: statsRes.count || 0,
          services: servicesRes.count || 0,
          team: teamRes.count || 0,
          articles: articlesRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    {
      title: 'İstatistikler',
      count: counts.stats,
      icon: BarChart3,
      color: 'text-primary',
    },
    {
      title: 'Hizmetler',
      count: counts.services,
      icon: Briefcase,
      color: 'text-secondary',
    },
    {
      title: 'Takım Üyeleri',
      count: counts.team,
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Blog Yazıları',
      count: counts.articles,
      icon: FileText,
      color: 'text-secondary',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-bold">{card.count}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCards;
