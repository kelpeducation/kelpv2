import dynamic from 'next/dynamic';

const ServicesPage = dynamic(() => import('@/pages/Services'), { ssr: true });

export default function ServicesRoute() {
  return <ServicesPage />;
}
