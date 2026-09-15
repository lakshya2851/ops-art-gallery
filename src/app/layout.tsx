import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opsartgallery.com"),
  title: {
    default: "OPS Art Gallery | Contemporary Fine Art in New Delhi",
    template: "%s | OPS Art Gallery New Delhi",
  },
  description:
    "OPS Art Gallery is a premier contemporary art destination in Shahpur Jat, New Delhi, exhibiting fine art paintings, modern sculptures, and cultural dialogues.",
  keywords: [
    "OPS Art Gallery",
    "Art Gallery New Delhi",
    "Shahpur Jat Art Gallery",
    "Contemporary Indian Art",
    "Indian Fine Art",
    "New Delhi Art Exhibitions",
    "Siri Fort Art Gallery",
  ],
  openGraph: {
    title: "OPS Art Gallery | Contemporary Fine Art in New Delhi",
    description:
      "Contemporary fine art gallery in Shahpur Jat, New Delhi. Featuring curated exhibitions, modern sculptures, and fine art collections.",
    url: "https://opsartgallery.com",
    siteName: "OPS Art Gallery",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675",
        width: 1200,
        height: 630,
        alt: "OPS Art Gallery Exhibition Space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPS Art Gallery | New Delhi",
    description: "Contemporary fine art gallery in Shahpur Jat, New Delhi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="bg-gallery-dark text-gallery-white font-sans antialiased selection:bg-gallery-brass selection:text-gallery-dark">
        <SmoothScroll>
          <Header />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
