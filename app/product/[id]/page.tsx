import type { Metadata } from 'next';
import ProductDetails from '@/views/ProductDetails';
import { allProducts } from '@/data/products';
import { readCmsSection } from '@/lib/cms/contentStore';
import type { CmsProductsPayload } from '@/lib/cms/types';

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  let products = allProducts;

  try {
    const live = await readCmsSection<CmsProductsPayload>('products');
    products = live.products;
  } catch {
    // Fall back to the build-time product list if the CMS file is unreadable.
  }

  const product = products.find((p) => p.id === Number(params.id));

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
