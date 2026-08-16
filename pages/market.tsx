import dynamic from 'next/dynamic';

const MarketPage = dynamic(() => import('@/pages/Market'), { ssr: true });

export default function MarketRoute() {
  return <MarketPage />;
}
