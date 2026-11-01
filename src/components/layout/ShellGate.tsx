"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePersonalization } from "@/personalization/usePersonalization";
import { CameraPrompt } from "@/components/onboard/CameraPrompt";
import { AppShell, DemoAgeSwitcher } from "./Shell";

export function ShellGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, ageGroup } = usePersonalization();
  const keepCamera = pathname === "/onboard" && searchParams.get("camera") === "1";
  const isAdmin = pathname === "/admin";

  useEffect(() => {
    if (!ready) return;
    if (!ageGroup && pathname !== "/onboard" && !isAdmin) router.replace("/onboard");
    if (ageGroup && pathname === "/onboard" && !keepCamera) router.replace("/");
  }, [ready, ageGroup, pathname, router, keepCamera, isAdmin]);

  if (!ready) return <div className="min-h-screen" />;
  if (pathname === "/onboard") {
    return (
      <>
        <main className="flex-1">{children}</main>
        <CameraPrompt />
      </>
    );
  }
  if (isAdmin && !ageGroup) {
    return (
      <>
        <div className="sticky top-0 z-40">
          <DemoAgeSwitcher />
        </div>
        <main className="flex-1">{children}</main>
        <CameraPrompt />
      </>
    );
  }
  if (!ageGroup) return <div className="min-h-screen" />;
  return (
    <>
      <AppShell showAgeBar={isAdmin}>{children}</AppShell>
      <CameraPrompt />
    </>
  );
}
