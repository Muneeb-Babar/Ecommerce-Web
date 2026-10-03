export const SITE_NAME = "NOVA";
export const SITE_TAGLINE = "Curated commerce, beautifully engineered.";

export const FREE_SHIPPING_THRESHOLD = 150;

export const SHIPPING_FEE = 9.99;

export const TAX_RATE = 0.05;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
] as const;

export const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Top Rated", value: "rating" },
] as const;