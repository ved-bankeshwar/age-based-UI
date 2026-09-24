"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { location } from "@/data";
import { ageGroupOrder, ageProfiles } from "@/personalization/ageProfiles";
import { navigationCatalog } from "@/personalization/navigation";
import { usePersonalization } from "@/personalization/usePersonalization";
import { useCart } from "@/state/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { SearchBar } from "@/components/discovery/SearchBar";

export function Wordmark() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" style={{ fontSize: "var(--text-lg)", fontWeight: 700, textDecoration: "none" }}>
      <svg width="1.3em" height="1.3em" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="15" cy="17" r="11" fill="var(--accent)" />
        <circle cx="25" cy="8" r="6" fill="var(--surface)" />
      </svg>
      Bite
    </Link>
  );
}

export function DemoAgeSwitcher() {
  const { ageGroup, chooseGroup } = usePersonalization();
  return (
    <div className="demo-switcher">
      <div className="demo-switcher-inner" role="radiogroup" aria-label="Viewing as">
        <span style={{ fontWeight: 700 }}>Viewing as</span>
        {ageGroupOrder.map((group) => (
          <button key={group} type="button" role="radio" aria-checked={ageGroup === group} onClick={() => chooseGroup(group, "switcher")}>
            {ageProfiles[group].label}
          </button>
        ))}
      </div>
    </div>
  );
}

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/restaurants") {
    return pathname === "/restaurants" || pathname.startsWith("/restaurant/") || pathname.startsWith("/categories");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const { profile } = usePersonalization();
  const { itemCount } = useCart();
  const pathname = usePathname();
  if (!profile) return null;
  const compact = profile.header.variant === "compact";
  const spelledOut = profile.header.variant === "simplified";
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Wordmark />
        <span className="inline-flex items-center gap-1 muted" style={{ fontSize: "var(--text-sm)" }}>
          <Icon name="pin" />
          {location.label}
        </span>
        <div className="header-actions">
          {compact ? <IconButton label="Search" href="/search"><Icon name="search" /></IconButton> : null}
          <Link href="/cart" className="bite-button bite-button-secondary" aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}>
            <Icon name="cart" />
            {spelledOut ? <span>Cart</span> : null}
            <span className="badge">{itemCount}</span>
          </Link>
          <Link href="/profile" aria-current={pathname === "/profile" ? "page" : undefined} aria-label="Profile">
            <Icon name="profile" />
            {spelledOut ? <span>Profile</span> : <span className="sr-only">Profile</span>}
          </Link>
        </div>
        {compact ? null : (
          <div className="header-search">
            <SearchBar />
          </div>
        )}
        <nav className="site-nav" aria-label="Primary">
          {profile.navigation.items.map((id) => {
            const item = navigationCatalog[id];
            const label = profile.navigation.variant === "compact" ? item.shortLabel : item.label;
            return (
              <Link key={id} href={item.href} aria-current={isActive(item.href, pathname) ? "page" : undefined}>
                {profile.navigation.iconWithLabel ? <Icon name={item.icon} /> : null}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>Bite is a fictional food delivery demo.</p>
        <nav className="flex flex-wrap" style={{ gap: "var(--space-4)" }} aria-label="Footer">
          <Link href="/help">Help</Link>
          <Link href="/offers">Offers</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </footer>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-40">
        <DemoAgeSwitcher />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <CartReplaceDialog />
    </>
  );
}

function CartReplaceDialog() {
  const { pendingReplace, confirmReplace, cancelReplace } = useCart();
  if (!pendingReplace) return null;
  return (
    <dialog open aria-labelledby="replace-title">
      <form method="dialog" className="stack">
        <h2 id="replace-title" style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>Replace cart?</h2>
        <p>Your cart has dishes from another kitchen. Adding {pendingReplace.name} will clear the current cart.</p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-3)" }}>
          <button type="button" className="bite-button bite-button-primary" onClick={confirmReplace}>Replace cart</button>
          <button type="button" className="bite-button bite-button-secondary" onClick={cancelReplace}>Keep current cart</button>
        </div>
      </form>
    </dialog>
  );
}
