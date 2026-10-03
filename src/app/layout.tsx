import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/provider";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NOVA — Curated Commerce, Beautifully Engineered",
    template: "%s | NOVA Store",
  },
  description:
    "NOVA curates thoughtfully designed products across electronics, fashion, home, beauty and more. Free shipping over $150, 30-day returns, secure checkout.",
  keywords: [
    "ecommerce",
    "online store",
    "electronics",
    "fashion",
    "home living",
    "beauty",
    "NOVA store",
  ],
  openGraph: {
    title: "NOVA Store",
    description: "Curated commerce, beautifully engineered.",
    type: "website",
    locale: "en_US",
    url: "https://nova-store.example.com",
  },
};

// Prevent theme flash-of-unstyled-content before hydration.
const themeScript = `
  (function () {
    try {
      var t = localStorage.getItem("theme");
      if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground selection:bg-primary/20">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}