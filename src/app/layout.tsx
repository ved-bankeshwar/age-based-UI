import { Suspense } from "react";
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { HARD_REFRESH_KEY, PERSONALIZATION_STORAGE_KEY } from "@/lib/storage";
import { Providers } from "@/state/Providers";
import { ShellGate } from "@/components/layout/ShellGate";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bite",
  description: "Bite is a fictional food delivery demo with an age-adaptive interface.",
};

const bootScript = `(function(){try{var raw=localStorage.getItem(${JSON.stringify(PERSONALIZATION_STORAGE_KEY)});if(raw){var data=JSON.parse(raw);var groups={toddler:1,child:1,teen:1,young:1,adult:1,older:1,elder:1};if(groups[data.ageGroup])document.documentElement.dataset.ageGroup=data.ageGroup;}}catch(e){}window.addEventListener("keydown",function(e){var key=e.key||"";var hard=(e.ctrlKey||e.metaKey)&&e.shiftKey&&(key==="r"||key==="R");if(!hard&&e.ctrlKey&&key==="F5")hard=true;if(!hard)return;try{sessionStorage.setItem(${JSON.stringify(HARD_REFRESH_KEY)},"1");}catch(err){}},true);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Providers>
          <Suspense fallback={<div className="min-h-screen" />}>
            <ShellGate>{children}</ShellGate>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
