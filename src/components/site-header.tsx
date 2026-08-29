"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, type NavItem } from "@/lib/site";
import { useCart } from "./cart-provider";
import { Bag, Chevron, Close, Menu } from "./icons";
import { Wordmark } from "./wordmark";

/** A link is "on" when it is the current page, or an ancestor of it (/blog/a-post -> /blog). */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** A parent is "on" when it or any of its children is. */
function isBranchActive(pathname: string, item: NavItem) {
  return isActive(pathname, item.href) || !!item.children?.some((c) => isActive(pathname, c.href));
}

export function SiteHeader() {
  const pathname = usePathname();
  const { totals, openCart, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** href of the desktop dropdown currently open, if any. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Close any open dropdown when the route changes, and on Escape.
  useEffect(() => {
    setOpenMenu(null);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  /** Small grace period so the pointer can cross the gap into the panel. */
  const open = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(href);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[60] bg-sand-50/90 backdrop-blur-xl transition-shadow duration-500 ${
          scrolled
            ? "border-b border-sand-200 shadow-[0_10px_30px_-24px_rgba(3,51,58,0.6)]"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Wordmark priority className="h-9 sm:h-11 lg:h-12" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = isBranchActive(pathname, item);
              const tone = active ? "text-flame-600" : "text-abyss-900/80 hover:text-abyss-900";

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`link-underline text-sm font-medium transition-colors ${tone}`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const expanded = openMenu === item.href;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => open(item.href)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => open(item.href)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
                  }}
                >
                  <Link
                    href={item.href}
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    className={`link-underline inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${tone}`}
                  >
                    {item.label}
                    <Chevron
                      aria-hidden
                      className={`size-3.5 transition-transform duration-300 ${
                        expanded ? "-rotate-180" : ""
                      }`}
                    />
                  </Link>

                  <div
                    className={`absolute top-full left-1/2 z-10 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      expanded
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <ul className="min-w-56 rounded-xl border border-sand-200 bg-sand-50 p-2 shadow-lift">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            tabIndex={expanded ? undefined : -1}
                            className={`block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                              isActive(pathname, child.href)
                                ? "bg-sand-100 text-flame-600"
                                : "text-abyss-900/80 hover:bg-sand-100 hover:text-abyss-900"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
          className={`absolute inset-0 bg-reef-500 transition-opacity duration-[400ms] ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`relative flex h-full flex-col overflow-y-auto p-6 transition-all duration-500 ${
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

          <nav className="mt-12 flex flex-col gap-1">
            {nav.map((item, i) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? undefined : -1}
                  style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms" }}
                  className={`block py-1 font-display text-4xl text-sand-50 transition-all duration-500 ${
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  {item.label}
                </Link>

                {item.children && (
                  <ul className="mt-1 mb-3 ml-1 flex flex-col gap-0.5 border-l border-sand-100/25 pl-4">
                    {item.children.map((child, j) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          tabIndex={menuOpen ? undefined : -1}
                          style={{
                            transitionDelay: menuOpen ? `${120 + (i + j) * 45}ms` : "0ms",
                          }}
                          className={`block py-1.5 text-lg text-sand-100/85 transition-all duration-500 ${
                            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto space-y-4 border-t border-sand-100/15 pt-6">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="btn btn-gold w-full"
            >
              Shop the flavours
            </Link>
            <p className="text-xs text-sand-100/80">
              {site.email} · {site.phone}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
