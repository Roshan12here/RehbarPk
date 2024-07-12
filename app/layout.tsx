import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/react';
import ClientOnly from "@/components/ClientOnly";


const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rehbar.PK",
  description: "A Advisor for Pakistanis ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html   lang="en">
      <body className={font.className}>      
      <ClientOnly>
        {children}
    </ClientOnly>
        <Toaster />
        <Analytics />

        </body>
    </html>
  );
}
