import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "GadaiMas - Gadai Emas Mudah & Cepat",
  description: "Simulasi gadai emas online, proses cepat dan terpercaya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}