import type { Metadata, Viewport } from "next";
import { Baloo_Thambi_2, Nunito, Noto_Sans_Tamil } from "next/font/google";
import { Suspense } from "react";
import AuthLinks from "@/components/AuthLinks";
import SiteNav from "@/components/SiteNav";
import ThemeShell from "@/components/ThemeShell";
import "./globals.css";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const baloo = Baloo_Thambi_2({ variable: "--font-baloo", subsets: ["latin"], weight: ["600", "700", "800"] });
const notoTamil = Noto_Sans_Tamil({ variable: "--font-tamil", subsets: ["tamil"] });

export const metadata: Metadata = {
  title: "மொழி-Brücke · Deutsch A1/A2",
  description: "Learn German A1 and A2 through stories, in English with Tamil help",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

// Runs before the first paint so English-only users never see Tamil flash by.
const LANG_SCRIPT = `try{var l=localStorage.getItem('lang');if(l==='en'||l==='both')document.documentElement.dataset.lang=l}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-lang="both"
      suppressHydrationWarning
      className={`${nunito.variable} ${baloo.variable} ${notoTamil.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <ThemeShell
          header={
            <SiteNav
              auth={
                <Suspense fallback={null}>
                  <AuthLinks />
                </Suspense>
              }
            />
          }
          footer={
            <footer className="mt-12 hidden border-t-2 border-line bg-white py-6 text-center text-sm text-muted lg:block">
              <span lang="ta">மொழி</span>-Brücke · A bridge from Tamil to German · Made for our study group
            </footer>
          }
        >
          {children}
        </ThemeShell>
      </body>
    </html>
  );
}
