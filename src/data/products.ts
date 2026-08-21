import { BookOpen, Brain, GraduationCap, Monitor, LucideIcon } from 'lucide-react';
import productsJson from '@/content/cms/products.json';

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
