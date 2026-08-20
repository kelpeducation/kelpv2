import type { Metadata } from 'next';
import Market from '@/pages/Market';

export const metadata: Metadata = {
  title: 'Market | KELP Education',
  description: "Browse KELP's marketplace of learning resources, courses, and educational materials.",
};

export default function Page() {
  return <Market />;
}
