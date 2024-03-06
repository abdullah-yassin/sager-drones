import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saqer Drones",
  description: "Generated by Abdallah Yassin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex flex-col min-h-screen">
          <Header />

          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 relative">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}