import dynamic from 'next/dynamic';

const ProductDetailsPage = dynamic(() => import('@/pages/ProductDetails'), { ssr: true });

export default function ProductDetailsRoute() {
  return <ProductDetailsPage />;
}
