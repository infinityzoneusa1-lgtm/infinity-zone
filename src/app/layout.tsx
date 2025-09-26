import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { generateSEO, generateOrganizationLD, generateWebsiteLD } from "@/lib/seo";

export const metadata: Metadata = {
  ...generateSEO({
    title: "Premium Beauty & Luxury Products Marketplace",
    description: "Discover premium beauty products, luxury items, and professional services at InfinityZone. Join our community of vendors, affiliates, and content creators.",
    keywords: "beauty products, luxury marketplace, skincare, makeup, premium cosmetics, affiliate program, vendor platform",
  }),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLD = generateOrganizationLD();
  const websiteLD = generateWebsiteLD();

  return (
    <html lang="en" className="font-sans antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#450209" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteLD),
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
