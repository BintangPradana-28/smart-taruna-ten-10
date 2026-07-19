import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// WHY Georgia isn't imported here even though globals.css defines
// --font-serif: Georgia, serif — Georgia is a font pre-installed on
// effectively every OS, not a webfont Google hosts, so next/font/google
// doesn't carry it and importing it here would fail the build. The CSS
// variable already falls back to the system font correctly with zero
// network requests, which is the outcome we want anyway.
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Smart Taruna Ten — Platform Digital Karang Taruna",
  description:
    "Smart Taruna Ten: kegiatan, berita, galeri, dan donasi Karang Taruna dalam satu tempat yang transparan dan mudah diakses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
