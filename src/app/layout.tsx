import type { Metadata } from "next";
import { Alegreya, IM_Fell_English_SC } from "next/font/google";
import "@styles/globals.css";
import Navigation from "@components/navigation/navigation";

const bodyFont = Alegreya({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = IM_Fell_English_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "DnD Battle Sim",
  description: "DnD battle simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
