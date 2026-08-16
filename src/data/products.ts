import { BookOpen, Brain, GraduationCap, Monitor, LucideIcon } from 'lucide-react';

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

export const categories: Category[] = [
  {
    id: 'books',
    title: 'Books',
    icon: BookOpen,
    description: 'Curated educational books for every learner',
    color: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
    count: 12,
  },
  {
    id: 'learning-materials',
    title: 'Learning Materials',
    icon: Brain,
    description: 'Worksheets, guides and hands-on resources',
    color: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary',
    count: 8,
  },
  {
    id: 'study-tools',
    title: 'Study Tools',
    icon: GraduationCap,
    description: 'Planners, flashcards and study aids',
    color: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
    count: 6,
  },
  {
    id: 'digital-resources',
    title: 'Digital Resources',
    icon: Monitor,
    description: 'E-books, templates and online courses',
    color: 'from-primary/20 to-accent/5',
    iconColor: 'text-primary',
    count: 10,
  },
];

export const allProducts: Product[] = [
  {
    id: 1,
    title: 'English Mastery Workbook',
    description: 'A comprehensive guide to fluent English — from grammar to professional communication.',
    price: '12,000 RWF',
    priceValue: 12000,
    category: 'books',
    badge: 'Best Seller',
    rating: 4.9,
    image: '/images/products/english-workbook.jpg',
    phrase: 'Wige neza, utere imbere!',
  },
  {
    id: 2,
    title: 'French Conversation Kit',
    description: 'Interactive cards and audio companion for mastering everyday French dialogue.',
    price: '15,000 RWF',
    priceValue: 15000,
    category: 'learning-materials',
    badge: 'New',
    rating: 4.7,
    image: '/images/products/french-kit.jpg',
    phrase: 'Bikore neza, wiyubake.',
  },
  {
    id: 3,
    title: 'Student Success Planner',
    description: 'Stay organised with goal-setting templates, weekly trackers and motivational prompts.',
    price: '8,000 RWF',
    priceValue: 8000,
    category: 'study-tools',
    badge: 'Popular',
    rating: 4.8,
    image: '/images/products/planner.jpg',
    phrase: 'Tegura ejo hazaza hawe!',
  },
  {
    id: 4,
    title: 'Digital Literacy E-Course',
    description: 'Self-paced online course covering essential digital skills for the modern learner.',
    price: '25,000 RWF',
    priceValue: 25000,
    category: 'digital-resources',
    badge: 'Premium',
    rating: 5.0,
    image: '/images/products/digital-course.jpg',
    phrase: 'Isi igiye mbere, nawe genda nayo!',
  },
  {
    id: 5,
    title: 'Critical Thinking Handbook',
    description: 'Exercises and frameworks to develop analytical reasoning across all subjects.',
    price: '10,000 RWF',
    priceValue: 10000,
    category: 'books',
    badge: null,
    rating: 4.6,
    image: '/images/products/photo-1456513080510-7bf3a84b82f8.jfif',
    phrase: 'Tekereza, ushake, ubone!',
  },
  {
    id: 6,
    title: 'KOEC Flashcard Set',
    description: 'Colour-coded flashcards designed around the Kennie-Oliver English Coaching system.',
    price: '6,500 RWF',
    priceValue: 6500,
    category: 'study-tools',
    badge: null,
    rating: 4.5,
    image: '/images/products/photo-1606326608606-aa0b62935f2b.jfif',
    phrase: 'Buri munsi wige ikintu gishya.',
  },
  {
    id: 7,
    title: "Teacher's Resource Pack",
    description: 'Lesson plans, rubrics and classroom activities for modern educators.',
    price: '18,000 RWF',
    priceValue: 18000,
    category: 'learning-materials',
    badge: 'Educator Pick',
    rating: 4.9,
    image: '/images/products/photo-1503676260728-1c00da094a0b.jfif',
    phrase: "Umwarimu mwiza ni intambwe y'ejo.",
  },
  {
    id: 8,
    title: 'Creative Writing Toolkit',
    description: 'Templates, story starters and editing checklists for aspiring writers.',
    price: '9,500 RWF',
    priceValue: 9500,
    category: 'digital-resources',
    badge: null,
    rating: 4.4,
    image: '/images/products/photo-1455390582262-044cdead277a.jfif',
    phrase: 'Andika, sogongera wandike!',
  },
];
