import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://buildom.com"),

  title: "builDom Construction | Building Better Together",

  description:
    "BuildDom Construction is a trusted construction and engineering company delivering residential, commercial, and infrastructure projects across Nepal.",

  keywords: [
    "Construction Company Nepal",
    "Engineering Nepal",
    "BuildDom",
    "Residential Construction",
    "Commercial Construction",
    "Infrastructure",
    "Architecture",
  ],

  authors: [
    {
      name: "builDom Construction",
    },
  ],

  creator: "builDom Construction",

  openGraph: {
    title: "builDom Construction",
    description: "Engineering Excellence. Building Trust.",
    url: "https://buildom.com",
    siteName: "builDom",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "builDom Construction",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "builDom Construction",
    description: "Engineering Excellence. Building Trust.",
    images: ["/images/logo/logo.jpeg"],
  },

  icons: {
    icon: "/images/logo/logo.jpeg",
    shortcut: "/images/logo/logo.jpeg",
    apple: "/images/logo/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}