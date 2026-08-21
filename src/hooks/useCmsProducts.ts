import { useEffect, useState } from 'react';
import {
  categories as defaultCategories,
  allProducts as defaultAllProducts,
  loadLiveProducts,
  ProductsData,
} from '@/data/products';

export const useCmsProducts = () => {
  const [products, setProducts] = useState<ProductsData>({
    categories: defaultCategories,
    allProducts: defaultAllProducts,
  });

  useEffect(() => {
    loadLiveProducts().then(setProducts);
  }, []);

  return products;
};
