import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import PageTransition from "@/components/PageTransition/PageTransition";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Veslařský a kanoistický klub | VKK TJ Lokomotiva Beroun",
  description:
    "Oficiální web Veslařského a kanoistického klubu Beroun. Tradice, výkonnost a radost z veslování od roku 1999. Nabízíme tréninky pro děti, mládež, dospělé i masters.",
  keywords:
    "veslování, Beroun, veslařský klub, VKK Beroun, veslo, sport, trénink, závody, mládež",
  authors: [{ name: "VKK Beroun" }],
  openGraph: {
    title: "Veslařský a kanoistický klub Beroun",
    description: "Tradice, výkonnost a radost z veslování od roku 1999",
    type: "website",
    locale: "cs_CZ",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <AuthProvider>
          <PageTransition>{children}</PageTransition>
        </AuthProvider>
      </body>
    </html>
  );
}
