import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { PageHeader } from "@/components/shared/page-header";
import { BrandMarquee } from "@/components/home/brand-marquee";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our full collection — electronics, fashion, home, beauty and more. Curated quality at fair prices.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The full collection"
        title="Shop all products"
        description="Every single item we curate, in one place. Filter, sort and find something you'll love."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <ProductGrid products={products} showFilters />
      </section>
      <BrandMarquee />
    </>
  );
}