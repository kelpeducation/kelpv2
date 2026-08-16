import dynamic from 'next/dynamic';

const IndexPage = dynamic(() => import('@/pages/Index'), { ssr: true });

export default function HomePage() {
  return <IndexPage />;
}
