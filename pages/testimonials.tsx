import dynamic from 'next/dynamic';

const TestimonialsPage = dynamic(() => import('@/pages/Testimonials'), { ssr: true });

export default function TestimonialsRoute() {
  return <TestimonialsPage />;
}
