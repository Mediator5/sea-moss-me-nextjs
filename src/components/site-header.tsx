"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { useCart } from "./cart-provider";
import { Bag, Close, Menu } from "./icons";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const { totals, openCart, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-[60] bg-sand-50/90 backdrop-blur-xl transition-shadow duration-500 ${
          scrolled ? "border-b border-sand-200 shadow-[0_10px_30px_-24px_rgba(3,51,58,0.6)]" : "border-b border-transparent"
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Wordmark priority className="h-9 sm:h-11 lg:h-12" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline text-sm font-medium transition-colors ${
                    active ? "text-flame-600" : "text-abyss-900/80 hover:text-abyss-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/products"
              className="hidden rounded-full bg-flame-550 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-flame-600 sm:inline-flex"
            >
              Shop now
            </Link>

            <button
              onClick={openCart}
              aria-label={`Open cart, ${totals.jars} items`}
              className="relative grid size-11 place-items-center rounded-full border border-sand-300 text-abyss-900 transition hover:bg-sand-100"
            >
              <Bag className="size-5" />
              {ready && totals.jars > 0 && (
                <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-flame-600 text-[10px] font-bold text-sand-50">
                  {totals.jars}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full border border-sand-300 text-abyss-900 transition hover:bg-sand-100 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-abyss-950 transition-opacity duration-[400ms] ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`relative flex h-full flex-col p-6 transition-all duration-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <Wordmark tone="light" className="h-10" />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border border-sand-100/25 text-sand-50"
            >
              <Close className="size-5" />
            </button>
          </div>

          <nav className="mt-14 flex flex-col gap-2">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map(
              (item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms" }}
                  className={`font-display text-4xl text-sand-50 transition-all duration-500 ${
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="mt-auto space-y-4 border-t border-sand-100/15 pt-6">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="btn btn-gold w-full"
            >
              Shop the flavours
            </Link>
            <p className="text-xs text-sand-100/60">
              {site.email} · {site.phone}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
