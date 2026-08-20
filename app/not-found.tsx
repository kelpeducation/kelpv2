import type { Metadata } from 'next';
import NotFound from '@/pages/NotFound';

export const metadata: Metadata = {
  title: 'Page Not Found | KELP Education',
};

export default function NotFoundPage() {
  return <NotFound />;
}
