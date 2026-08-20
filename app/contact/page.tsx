import type { Metadata } from 'next';
import Contact from '@/pages/Contact';

export const metadata: Metadata = {
  title: 'Contact Us | KELP Education',
  description: "Get in touch with KELP Education. We'll get back to you within 24 hours.",
};

export default function Page() {
  return <Contact />;
}
