import { getPageBySlug } from '@/lib/dato-cms/fetchers';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about');

  if (!page) {
    return {
      title: 'À propos',
    };
  }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.content.substring(0, 160),
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  if (!page) {
    notFound();
  }

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}

