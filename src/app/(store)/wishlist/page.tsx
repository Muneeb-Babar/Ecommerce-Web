import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "View the products you've saved and pick up where you left off.",
};

export default function WishlistPage() {
  return <WishlistView />;
}