import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/content";
import { getProductsByCategory } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { CategoryHero } from "@/components/category/category-hero";

export const dynamicParams = true;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} — Shop the Collection`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);

  if (!cat) notFound();

  const items = getProductsByCategory(cat.slug);

  return (
    <>
      <CategoryHero category={cat} />
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <ProductGrid products={items} showFilters />
      </section>
    </>
  );
}