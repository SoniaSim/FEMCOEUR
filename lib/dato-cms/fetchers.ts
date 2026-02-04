import { datoCmsClient, isMockMode } from './client';
import { mockPages, mockArticles, mockEvents, mockMembers, mockResources } from './mock-data';
import type { Page, Article, Event, Member, Resource } from '@/lib/types/dato-cms';

// Fonction pour récupérer toutes les pages
export async function getAllPages(): Promise<Page[]> {
  if (isMockMode) {
    return mockPages;
  }

  if (!datoCmsClient) {
    return [];
  }

  // TODO: Implémenter la requête GraphQL réelle
  return [];
}

// Fonction pour récupérer une page par son slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (isMockMode) {
    return mockPages.find((page) => page.slug === slug) || null;
  }

  if (!datoCmsClient) {
    return null;
  }

  // TODO: Implémenter la requête GraphQL réelle
  return null;
}

// Fonction pour récupérer tous les articles
export async function getAllArticles(
  limit: number = 10,
  skip: number = 0
): Promise<{ allArticles: Article[]; _allArticlesMeta: { count: number } }> {
  if (isMockMode) {
    const articles = mockArticles.slice(skip, skip + limit);
    return {
      allArticles: articles,
      _allArticlesMeta: { count: mockArticles.length },
    };
  }

  if (!datoCmsClient) {
    return { allArticles: [], _allArticlesMeta: { count: 0 } };
  }

  // TODO: Implémenter la requête GraphQL réelle
  return { allArticles: [], _allArticlesMeta: { count: 0 } };
}

// Fonction pour récupérer un article par son slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isMockMode) {
    return mockArticles.find((article) => article.slug === slug) || null;
  }

  if (!datoCmsClient) {
    return null;
  }

  // TODO: Implémenter la requête GraphQL réelle
  return null;
}

// Fonction pour récupérer les événements
export async function getAllEvents(
  status: 'upcoming' | 'past' = 'upcoming'
): Promise<Event[]> {
  if (isMockMode) {
    return mockEvents.filter((event) => event.status === status);
  }

  if (!datoCmsClient) {
    return [];
  }

  // TODO: Implémenter la requête GraphQL réelle
  return [];
}

// Fonction pour récupérer tous les membres
export async function getAllMembers(): Promise<Member[]> {
  if (isMockMode) {
    return mockMembers;
  }

  if (!datoCmsClient) {
    return [];
  }

  // TODO: Implémenter la requête GraphQL réelle
  return [];
}

// Fonction pour récupérer toutes les ressources
export async function getAllResources(): Promise<Resource[]> {
  if (isMockMode) {
    return mockResources;
  }

  if (!datoCmsClient) {
    return [];
  }

  // TODO: Implémenter la requête GraphQL réelle
  return [];
}

// Fonction pour récupérer les données de la page d'accueil
export async function getHomepageData() {
  const allPages = await getAllPages();
  const { allArticles } = await getAllArticles(3, 0);
  const allEvents = await getAllEvents('upcoming');

  return {
    allPages,
    allArticles,
    allEvents,
  };
}

