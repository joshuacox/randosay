import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "randosay - Random terminal fortunes with cowsay, ponysay, and lolcat",
  description:
    "randosay wraps Linux fortunes with randomized ASCII art banners, speech bubbles from cowsay, cowthink, ponysay, ponythink, lolcat rainbows, and dynamic horizontal rules.",
  keywords: [
    "randosay",
    "cowsay",
    "ponysay",
    "lolcat",
    "fortune",
    "linux cli",
    "terminal utility",
    "shell script",
  ],
  authors: [{ name: "Joshua Edward McLaughlin Cox", url: "https://github.com/joshuacox/randosay" }],
  openGraph: {
    title: "randosay - Random ASCII terminal fortunes",
    description:
      "A CLI utility wrapping fortune with cowsay, cowthink, ponysay, lolcat, and procedural horizontal rules.",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-8973108060277483",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        {/* Google AdSense Script */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8973108060277483"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
