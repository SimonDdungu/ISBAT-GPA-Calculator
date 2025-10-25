import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import "./globals.css";
import { Footer, Navbar } from "@/components/Global";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISBAT GPA Calculator",
  description: "A simple and accurate GPA calculator designed for ISBAT university students to compute semester and cumulative GPAs easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="ISBAT GPA" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrimeReactProvider>
          <Navbar />
          {children}
          <Footer />
        </PrimeReactProvider>
      </body>
    </html>
  );
}
