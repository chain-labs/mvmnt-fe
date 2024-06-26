import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./web3Utils/privyProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AA-MVMNT",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#212124] text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
