import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'About Us | KELP Education',
  description:
    "Learn about KELP's mission to deliver transformative, sustainable, and equitable education programs across Rwanda.",
};

export default function Page() {
  return <About />;
}
