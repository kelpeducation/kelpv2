import type { Metadata } from 'next';
import Testimonials from '@/pages/Testimonials';

export const metadata: Metadata = {
  title: 'Success Stories | KELP Education',
  description:
    "Read testimonials and success stories from students, parents, and schools who have benefited from KELP's education programs.",
};

export default function Page() {
  return <Testimonials />;
}
