import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { PERSONALIZATION_STORAGE_KEY } from "@/lib/storage";
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

const bootScript = `(function(){try{var raw=localStorage.getItem(${JSON.stringify(PERSONALIZATION_STORAGE_KEY)});if(!raw)return;var data=JSON.parse(raw);if(data.ageGroup==="young"||data.ageGroup==="adult"||data.ageGroup==="older"){document.documentElement.dataset.ageGroup=data.ageGroup;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Providers>
          <ShellGate>{children}</ShellGate>
        </Providers>
      </body>
    </html>
  );
}
