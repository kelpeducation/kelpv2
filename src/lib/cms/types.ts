export interface CmsProductCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  iconColor: string;
  count: number;
}

export interface CmsProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  category: string;
  badge: string | null;
  rating: number;
  image: string;
  phrase: string;
}

export interface CmsProductsPayload {
  categories: CmsProductCategory[];
  products: CmsProduct[];
}
