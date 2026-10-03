import type { Category, Testimonial } from "@/types";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const categories: Category[] = [
  {
    slug: "electronics",
    name: "Electronics",
    tagline: "Sound. Vision. Innovation.",
    description:
      "Crystal-clear audio, smart wearables, and gear that keeps up with your ideas — curated for people who love great tech.",
    image: img("photo-1498049794561-7780e7231661"),
    count: 5,
  },
  {
    slug: "fashion",
    name: "Fashion",
    tagline: "Wear the story.",
    description:
      "Timeless pieces and everyday essentials cut from responsibly sourced fabrics. Made to last, designed to impress.",
    image: img("photo-1523381210434-271e8be1f52b"),
    count: 3,
  },
  {
    slug: "home",
    name: "Home & Living",
    tagline: "Make home feel like you.",
    description:
      "Artisan ceramics, soft linens, and sculptural lighting — objects that warm your space and tell a story.",
    image: img("photo-1616486338812-3dadae4b4ace"),
    count: 4,
  },
  {
    slug: "sports",
    name: "Sports & Outdoors",
    tagline: "Train. Explore. Conquer.",
    description:
      "Performance gear engineered for movement — from sunrise yoga flows to summit views and everything between.",
    image: img("photo-1552674605-db6ffd4facb5"),
    count: 2,
  },
  {
    slug: "beauty",
    name: "Beauty",
    tagline: "Clean glow, daily.",
    description:
      "Vegan, dermatologist-tested formulas that make self-care feel like a ritual. Beauty without compromise.",
    image: img("photo-1596462502278-27bfdc403348"),
    count: 2,
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "Details that define.",
    description:
      "Handcrafted leather goods and statement eyewear — the finishing touches that elevate every outfit.",
    image: img("photo-1553062407-98eeb64c6a62"),
    count: 2,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-001",
    name: "Sara Khan",
    role: "Verified Buyer",
    avatar: img("photo-1494790108377-be9c29b29330"),
    quote:
      "The quality blew me away. My Aurora headphones arrived the next day and the 3D site experience is as premium as the product itself.",
    rating: 5,
    location: "Dubai, UAE",
  },
  {
    id: "t-002",
    name: "Daniel Ruiz",
    role: "Verified Buyer",
    avatar: img("photo-1500648767791-00dcc994a43e"),
    quote:
      "Ordered hiking boots for a Kilimanjaro trip. Waterproof, comfy out of the box, and the checkout was unbelievably smooth.",
    rating: 5,
    location: "Madrid, Spain",
  },
  {
    id: "t-003",
    name: "Amelia Chen",
    role: "Verified Buyer",
    avatar: img("photo-1534528741775-53994a69daeb"),
    quote:
      "Their ceramics are one-of-one pieces. You can tell everything is curated by people who genuinely care about design.",
    rating: 5,
    location: "Singapore",
  },
  {
    id: "t-004",
    name: "Tariq Ahmed",
    role: "Verified Buyer",
    avatar: img("photo-1507003211169-0a1dd7228f2d"),
    quote:
      "Site is fast, the scroll animations are gorgeous, and support replied in minutes. This is how e-commerce should feel.",
    rating: 5,
    location: "Karachi, Pakistan",
  },
  {
    id: "t-005",
    name: "Elena Petrova",
    role: "Verified Buyer",
    avatar: img("photo-1438761681033-6461ffad8d80"),
    quote:
      "The Glow serum transformed my skin in two weeks — and free shipping made it even better. Already ordered twice.",
    rating: 5,
    location: "Berlin, Germany",
  },
];

export const brandNames = [
  "VoltAudio",
  "Maison Forme",
  "Prism Labs",
  "Studio Noma",
  "Trail & Co.",
  "ZenFit",
  "PureLeaf",
  "Atelier Nord",
  "Lumina",
  "Sunbeam",
  "Orbit",
  "Lil Sprout",
];