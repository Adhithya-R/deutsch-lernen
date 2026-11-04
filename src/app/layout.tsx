import type { Metadata, Viewport } from "next";
import { DM_Sans, Noto_Sans_Tamil } from "next/font/google";
import { Suspense } from "react";
import AuthLinks from "@/components/AuthLinks";
import SiteNav from "@/components/SiteNav";
import TabBar from "@/components/TabBar";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const notoTamil = Noto_Sans_Tamil({ variable: "--font-tamil", subsets: ["tamil"] });

export const metadata: Metadata = {
  title: "மொழி-Brücke · Deutsch A1/A2",
  description: "Learn German A1 and A2 in Tamil and English",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${notoTamil.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <SiteNav
          auth={
            <Suspense fallback={null}>
              <AuthLinks />
            </Suspense>
          }
        />
        <div className="flex-1 pb-24 lg:pb-0">{children}</div>
        <footer className="mt-12 hidden border-t border-line bg-sand py-6 text-center text-sm text-muted lg:block">
          <span lang="ta">மொழி</span>-Brücke · A bridge from Tamil to German · Made for our study group
        </footer>
        <TabBar />
      </body>
    </html>
  );
}
