import { BookOpen, Brain, GraduationCap, Monitor, LucideIcon } from 'lucide-react';
import productsJson from '@/content/cms/products.json';
import type { CmsProductsPayload } from '@/lib/cms/types';

export interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
  iconColor: string;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  priceValue: number; // For calculations
  category: string;
  badge: string | null;
  rating: number;
  image: string;
  phrase: string;
}

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  GraduationCap,
  Monitor,
};

export const categories: Category[] = productsJson.categories.map((category) => ({
  ...category,
  icon: iconMap[category.icon] ?? BookOpen,
}));

export const allProducts: Product[] = productsJson.products;

export interface ProductsData {
  categories: Category[];
  allProducts: Product[];
}

export const loadLiveProducts = async (): Promise<ProductsData> => {
  try {
    const response = await fetch('/api/cms/products', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to load live products.');
    }

    const payload = await response.json();
    const data = payload.data as CmsProductsPayload;

    return {
      categories: data.categories.map((category) => ({
        ...category,
        icon: iconMap[category.icon] ?? BookOpen,
      })),
      allProducts: data.products,
    };
  } catch {
    return { categories, allProducts };
  }
};
