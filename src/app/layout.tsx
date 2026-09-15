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
  ],
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
