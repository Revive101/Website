import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "@/styles/globals.scss";
import { SITE, SITE_URL } from "@/lib/site";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s - ${SITE.name}` },
  applicationName: SITE.name,
  description: SITE.description,
  authors: [{ name: "Phill030", url: "https://phill030.de" }],
  keywords: SITE.keywords,
  publisher: "Phill030",
  creator: "Phill030",
  category: "gaming",
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexendDeca.variable}`}>{children}</body>
    </html>
  );
}
