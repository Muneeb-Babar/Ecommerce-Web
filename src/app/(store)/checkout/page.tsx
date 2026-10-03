import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Complete your purchase securely in a few simple steps.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}