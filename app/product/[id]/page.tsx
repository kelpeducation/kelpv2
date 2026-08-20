import type { Metadata } from 'next';
import ProductDetails from '@/views/ProductDetails';
import { allProducts } from '@/data/products';

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = allProducts.find((p) => p.id === Number(params.id));

  if (!product) {
    return { title: 'Product Not Found | KELP Education' };
  }

  return {
    title: `${product.title} | KELP Market`,
    description: product.description,
  };
}

export default function Page({ params }: ProductPageProps) {
  return <ProductDetails id={params.id} />;
}
