import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FEMCOEUR - Association des Cardiologues Femmes",
  description:
    "Promouvoir la place de la femme dans le domaine de la cardiologie",
  icons: {
    icon: "/simple-logo.png",
    shortcut: "/simple-logo.png",
    apple: "/simple-logo.png",
  },
  openGraph: {
    title: "FEMCOEUR - Association des Cardiologues Femmes",
    description:
      "Promouvoir la place de la femme dans le domaine de la cardiologie",
    images: ["/simple-logo.png"],
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
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
