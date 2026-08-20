import type { Metadata } from 'next';
import Blog from '@/pages/Blog';

export const metadata: Metadata = {
  title: 'Grow With Us | KELP Education Blog',
  description: 'Insights and articles on literacy, teacher training, and adult learning from the KELP Education team.',
};

export default function Page() {
  return <Blog />;
}
