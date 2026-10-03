export interface ProductImage {
  src: string;
  alt: string;
}

export interface VariantOption {
  label: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  features: string[];
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes?: string[];
  badges?: Array<"new" | "sale" | "bestseller" | "limited">;
  isHot?: boolean;
  stock: number;
  createdAt: string;
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  count: number;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  location: string;
}