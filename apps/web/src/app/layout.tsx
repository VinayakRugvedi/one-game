import "@repo/ui/global.css";
import type { Metadata } from "next";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";

import Header from "./components/header";
import Footer from "./components/footer";

const spaceGrotesk = SpaceGrotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "One Game",
  description: "The internet's most minimalistic and premium board game.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${spaceGrotesk.className}`}>
        <div className="bg-background text-foreground min-h-svh">
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
