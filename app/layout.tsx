import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whosbrand.work"),
  title: {
    default: "Whosbrand — Brand Naming Studio Bangkok | คิดชื่อแบรนด์",
    template: "%s | Whosbrand",
  },
  description:
    "Brand naming studio in Bangkok. We craft memorable brand names, concept sheets, and slogans. รับคิดชื่อแบรนด์ ออกแบบชื่อสินค้า ที่ปรึกษาสร้างแบรนด์ 4 วันส่งงาน เริ่มต้น ฿2,999",
  keywords: [
    "whosbrand",
    "whosbrand.work",
    "คิดชื่อแบรนด์",
    "ตั้งชื่อแบรนด์",
    "รับคิดชื่อแบรนด์",
    "brand naming",
    "brand naming bangkok",
    "brand naming thailand",
    "บริการคิดชื่อแบรนด์",
    "ที่ปรึกษาแบรนด์",
    "ออกแบบชื่อแบรนด์",
  ],
  authors: [{ name: "Whosbrand" }],
  creator: "Whosbrand",
  publisher: "Whosbrand",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "th_TH",
    url: "https://whosbrand.work",
    siteName: "Whosbrand",
    title: "Whosbrand — Make Them Ask | คิดชื่อแบรนด์ที่โดนใจ",
    description:
      "Brand naming studio Bangkok. Names that make people stop and ask 'who made this?' รับคิดชื่อแบรนด์ เริ่มต้น ฿2,999",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Whosbrand — Brand Naming Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whosbrand — Brand Naming Studio Bangkok",
    description: "Names that make people ask 'who made this?' คิดชื่อแบรนด์ที่โดนใจ",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://whosbrand.work",
  },
  verification: {
    // Uncomment and paste your code after setting up Search Console
    // google: "your-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Whosbrand",
              alternateName: "คิดชื่อแบรนด์ Whosbrand",
              description:
                "Brand naming studio based in Bangkok, Thailand. We craft brand names, concept sheets, and slogans.",
              url: "https://whosbrand.work",
              logo: "https://whosbrand.work/logo.png",
              image: "https://whosbrand.work/og-image.jpg",
              priceRange: "฿2,999 - ฿3,999",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangkok",
                addressCountry: "TH",
              },
              areaServed: {
                "@type": "Country",
                name: "Thailand",
              },
              serviceType: [
                "Brand Naming",
                "Brand Consulting",
                "Slogan Creation",
                "คิดชื่อแบรนด์",
              ],
              offers: [
                {
                  "@type": "Offer",
                  name: "Name Me Now",
                  price: "2999",
                  priceCurrency: "THB",
                  description: "5 brand name candidates with concept sheets",
                },
                {
                  "@type": "Offer",
                  name: "Brand Me Better",
                  price: "3999",
                  priceCurrency: "THB",
                  description: "5 names + 2 slogans + voice guidelines",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "58",
              },
              sameAs: [
                "https://fastwork.co/user/whosbrandbkk/branding-66179568",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}