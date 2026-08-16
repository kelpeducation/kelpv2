import dynamic from 'next/dynamic';

const NotFoundPage = dynamic(() => import('@/pages/NotFound'), { ssr: true });

export default function NotFoundRoute() {
  return <NotFoundPage />;
}
