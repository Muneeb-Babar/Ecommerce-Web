import { Hero } from "@/components/home/hero";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { ProductShowcase } from "@/components/home/product-showcase";
import { CategoryExplore } from "@/components/home/category-explore";
import { EditorialBanner } from "@/components/home/editorial-banner";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import {
  getFeaturedProducts,
  getNewArrivals,
} from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      <Hero />
      <BrandMarquee />
      <ProductShowcase
        products={featured}
        eyebrow="Hand-picked"
        title="Featured this week"
        description="The products everyone's talking about — chosen by our curation team and loved by 12,000+ customers."
        ctaHref="/products"
        ctaLabel="Shop featured"
      />
      <CategoryExplore />
      <EditorialBanner />
      <StatsSection />
      <ProductShowcase
        products={newArrivals}
        eyebrow="Just landed"
        title="New arrivals"
        description="Fresh from our latest curation round — be the first to cop these drops."
        ctaHref="/products?sort=newest"
        ctaLabel="See what's new"
      />
      <Testimonials />
      <Newsletter />
    </>
  );
}