import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/GoogleSansOTF/GoogleSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSansOTF/GoogleSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSansOTF/GoogleSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/logo/favicon.ico", sizes: "any" },
      { url: "/logo/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/logo/favicon.png",
  },
  metadataBase: new URL("https://roomieverse.blog"),
  title: {
    default: "roomieVerse | Find your next roommate",
    template: "%s | roomieVerse",
  },
  description:
    "roomieVerse connects real humans who want to share housing, matching roommates by lifestyle instead of generic listings.",
  openGraph: {
    title: "roomieVerse",
    description:
      "Match with compatible roommates, keep brokers out of the process, and turn any shared flat into a real community.",
    url: "/",
    siteName: "roomieVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "roomieVerse",
    description:
      "A curated roommate marketplace built for lifestyle compatibility and transparent sharing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${googleSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-google-sans), "Google Sans", system-ui, sans-serif' }}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
