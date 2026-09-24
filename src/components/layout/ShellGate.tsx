"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePersonalization } from "@/personalization/usePersonalization";
import { AppShell, DemoAgeSwitcher } from "./Shell";

export function ShellGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, ageGroup } = usePersonalization();

  useEffect(() => {
    if (!ready) return;
    if (!ageGroup && pathname !== "/onboard") router.replace("/onboard");
    if (ageGroup && pathname === "/onboard") router.replace("/");
  }, [ready, ageGroup, pathname, router]);

  if (!ready) return <div className="min-h-screen" />;
  if (pathname === "/onboard") {
    return (
      <>
        <DemoAgeSwitcher />
        <main className="flex-1">{children}</main>
      </>
    );
  }
  if (!ageGroup) return <div className="min-h-screen" />;
  return <AppShell>{children}</AppShell>;
}
