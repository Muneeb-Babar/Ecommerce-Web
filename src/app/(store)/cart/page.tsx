import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your cart and proceed to secure checkout.",
};

export default function CartPage() {
  return <CartView />;
}