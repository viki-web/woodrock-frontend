import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHeaderData, getFooterData } from "@/lib/api";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://woodrockengineering.com"),
  title: "Woodrock Engineering | Precision Engineering & Design",
  description: "From post-frame to commercial builds, our engineering supports real projects designed to perform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerData, footerData] = await Promise.all([
    getHeaderData(),
    getFooterData()
  ]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={headerData} />
        {children}
        <Footer data={footerData} />
      </body>
    </html>
  );
}

