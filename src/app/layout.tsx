import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Tamil } from "next/font/google";
import { Suspense } from "react";
import AuthLinks from "@/components/AuthLinks";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoTamil = Noto_Sans_Tamil({ variable: "--font-tamil", subsets: ["tamil"] });

export const metadata: Metadata = {
  title: "மொழி-Brücke · Deutsch A1/A2",
  description: "Learn German A1 and A2 in Tamil and English",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoTamil.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNav
          auth={
            <Suspense fallback={null}>
              <AuthLinks />
            </Suspense>
          }
        />
        <div className="flex-1">{children}</div>
        <footer className="mt-12 bg-brand-950 p-6 text-center text-sm text-cream/80">
          <span lang="ta">மொழி</span>-Brücke · A bridge from Tamil to German · Made for our study group
        </footer>
      </body>
    </html>
  );
}
