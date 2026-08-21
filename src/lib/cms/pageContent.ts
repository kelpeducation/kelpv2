import pagesContentJson from '@/content/cms/pages-content.json';

export interface HomeContent {
  hero: any;
  servicesSection: any;
  aboutSection: any;
  testimonialsSection: any;
  ctaSection: any;
}

export interface PagesContent {
  home: HomeContent;
  aboutPage: any;
  servicesPage: any;
  blogPage: any;
}

export const defaultPagesContent: PagesContent = pagesContentJson as PagesContent;

export const loadLivePagesContent = async (): Promise<PagesContent> => {
  try {
    const response = await fetch('/api/cms/pages-content', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to load pages content.');
    }

    const payload = await response.json();
    return payload.data as PagesContent;
  } catch {
    return defaultPagesContent;
  }
};
