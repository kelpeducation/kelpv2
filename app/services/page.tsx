import type { Metadata } from 'next';
import Services from '@/pages/Services';

export const metadata: Metadata = {
  title: 'Services & Programs | KELP Education',
  description:
    "Explore KELP's education services and programs, including teacher training, school consultancy, English courses, and adult learning.",
};

export default function Page() {
  return <Services />;
}
