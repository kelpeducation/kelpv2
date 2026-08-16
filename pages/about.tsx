import dynamic from 'next/dynamic';

const AboutPage = dynamic(() => import('@/pages/About'), { ssr: true });

export default function AboutRoute() {
  return <AboutPage />;
}
