import "@repo/ui/global.css";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";

import Header from "@/components/header";
import Footer from "@/components/footer";

import "./style.css";

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "One Game",
  description:
    "The internet's most minimal and premium board game. Introducing Bingo.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icons/flower-black-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icons/flower-white-logo.svg",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark antialiased scroll-smooth"
      style={{ colorScheme: "dark" }}
    >
      <body className={`${spaceGrotesk.className}`}>
        <div className="bg-background text-foreground min-h-svh overflow-hidden">
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
