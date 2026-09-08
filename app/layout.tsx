import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://femcoeur.fr"),
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
  icons: {
    icon: "/simple-logo.png",
    shortcut: "/simple-logo.png",
    apple: "/simple-logo.png",
  },
  openGraph: {
    title: "FEMCOEUR — Association de cardiologues femmes",
    description:
      "FEMCOEUR est une association de cardiologues femmes. Nous promouvons la place de la femme dans la cardiologie et la prise en charge des maladies cardiovasculaires au féminin.",
    url: "https://femcoeur.fr",
    siteName: "FEMCOEUR",
    locale: "fr_FR",
    type: "website",
    images: ["/simple-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FEMCOEUR — Association de cardiologues femmes",
    description:
      "FEMCOEUR est une association de cardiologues femmes. Nous promouvons la place de la femme dans la cardiologie.",
    images: ["/simple-logo.png"],
  },
  alternates: {
    canonical: "https://femcoeur.fr",
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
