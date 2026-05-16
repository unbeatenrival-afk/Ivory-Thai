/**
 * Root Layout
 * Global layout with fonts and metadata
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ivory Thai North Ryde - Authentic Thai Cuisine",
    template: "%s | Ivory Thai North Ryde",
  },
  description: "Experience authentic Thai cuisine at Ivory Thai North Ryde. Explore our immersive 3D menu, order online, or book a table. Open 7 days, 11:30am-9pm.",
  keywords: ["Thai restaurant", "North Ryde", "Thai food", "Sydney Thai", "authentic Thai", "3D menu"],
  authors: [{ name: "Ivory Thai North Ryde" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://ivorythainorthryde.com.au/",
    title: "Ivory Thai North Ryde - Authentic Thai Cuisine",
    description: "Experience authentic Thai cuisine with our immersive 3D menu",
    siteName: "Ivory Thai North Ryde",
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
    <html
      lang="en-AU"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-black font-sans">{children}</body>
    </html>
  );
}
