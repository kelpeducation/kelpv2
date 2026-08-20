import type { MetadataRoute } from 'next';
import { allProducts } from '@/data/products';

const baseUrl = 'https://www.kelpeducation.com';

const staticRoutes = [
  '',
  '/about',
  '/services',
  '/market',
  '/blog',
  '/contact',
  '/testimonials',
  '/privacy-policy',
  '/terms-of-service',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...productEntries];
}
