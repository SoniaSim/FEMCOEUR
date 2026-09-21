import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CANONICAL_ORIGIN } from "@/lib/site-url";
import { OG_DEFAULT_IMAGE, baseOpenGraph } from "@/lib/seo/open-graph";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    template: "%s | FEMCOEUR",
    default: "FEMCOEUR — Association de cardiologues femmes",
  },
  description:
    "FEMCOEUR est une association de cardiologues femmes. Nous promouvons la place de la femme dans la cardiologie et la prise en charge des maladies cardiovasculaires au féminin.",
  keywords: [
    "cardiologues femmes",
    "FEMCOEUR",
    "cardiologie féminine",
    "association cardiologie",
    "santé cardiovasculaire femme",
    "réseau cardiologue France",
  ],
  openGraph: {
    ...baseOpenGraph,
    title: "FEMCOEUR — Association de cardiologues femmes",
    description:
      "FEMCOEUR est une association de cardiologues femmes. Nous promouvons la place de la femme dans la cardiologie et la prise en charge des maladies cardiovasculaires au féminin.",
    url: CANONICAL_ORIGIN,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FEMCOEUR — Association de cardiologues femmes",
    description:
      "FEMCOEUR est une association de cardiologues femmes. Nous promouvons la place de la femme dans la cardiologie.",
    images: [OG_DEFAULT_IMAGE.url],
  },
  alternates: {
    canonical: "/",
  },
  // Preuve de propriété du site pour Google Search Console.
  verification: {
    google: "C2PMjSBCgTU8IHT2UI2J0N2YIrt73l-wOdY2nTE0kYI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
