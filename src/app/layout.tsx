import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QuoteProvider } from "../contexts/QuoteContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Print Market · Concept prototype",
  description: "A concept for getting print quotes from print shops, designed by Stefan M Pedersen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QuoteProvider>
          {children}
        </QuoteProvider>
      </body>
    </html>
  );
}
