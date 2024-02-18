import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./provider";
import Footer from "@/components/blocks/Footer";
import Header from "@/components/blocks/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head></head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Header />
          <div>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
