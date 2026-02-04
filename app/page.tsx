import { getHomepageData } from '@/lib/dato-cms/fetchers';
import { HeroSection } from '@/components/content/HeroSection';
import { ArticlesSection } from '@/components/content/ArticlesSection';
import { EventsSection } from '@/components/content/EventsSection';

export default async function Home() {
  const { allPages, allArticles, allEvents } = await getHomepageData();
  const homepage = allPages[0];

  return (
    <>
      <HeroSection
        title={homepage?.title}
        description={homepage?.content ? homepage.content.substring(0, 150) + '...' : undefined}
      />
      <ArticlesSection articles={allArticles} />
      <EventsSection events={allEvents} />
    </>
  );
}

