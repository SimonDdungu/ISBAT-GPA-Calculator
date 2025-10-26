import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import "./globals.css";
import { Footer, Navbar } from "@/components/Global";
import { ConfirmDialog } from "primereact/confirmdialog";

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
  description: "A simple ISBAT GPA calculator designed for ISBAT university students to compute semester and cumulative GPA easily.",
  openGraph: {
    title: "ISBAT GPA Calculator",
    description: "A simple ISBAT GPA calculator designed for ISBAT university students to compute semester and cumulative GPA easily.",
    url: "https://isbat-gpa-calculator.vercel.app/",
    type: "website",
    siteName: "ISBAT GPA Calculator",
    images: [
      {
        url: "https://isbat-gpa-calculator.vercel.app/isbatgpaopenimage.png",
        width: 1200,
        height: 630,
        alt: "ISBAT GPA Calculator"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="apple-mobile-web-app-title" content="ISBAT GPA" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <PrimeReactProvider>
          <ConfirmDialog className='w-[90vw] md:w-120 text-sm'/>
          <Navbar />
          {children}
          <Footer />
        </PrimeReactProvider>
      </body>
    </html>
  );
}
