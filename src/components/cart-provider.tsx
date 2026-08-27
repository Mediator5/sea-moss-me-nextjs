"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { priceCart, type CartLine, type CartTotals } from "@/lib/cart";

const STORAGE_KEY = "sea-moss-me:cart:v1";

type CartContextValue = {
  lines: CartLine[];
  totals: CartTotals;
  ready: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (sizeId: string, qty?: number) => void;
  setQty: (sizeId: string, qty: number) => void;
  remove: (sizeId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Deliberate: the cart must render empty on the server and hydrate from
          // localStorage on the client, so this read can only happen in an effect.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setLines(
            parsed
              .filter(
                (l): l is CartLine =>
                  typeof l === "object" &&
                  l !== null &&
                  typeof (l as CartLine).sizeId === "string" &&
                  typeof (l as CartLine).qty === "number",
              )
              .map((l) => ({ sizeId: l.sizeId, qty: l.qty })),
          );
        }
      }
    } catch {
      /* private mode / blocked storage — start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const add = useCallback((sizeId: string, qty = 1) => {
    setLines((current) => {
      const existing = current.find((l) => l.sizeId === sizeId);
      if (existing) {
        return current.map((l) =>
          l.sizeId === sizeId ? { ...l, qty: Math.min(50, l.qty + qty) } : l,
        );
      }
      return [...current, { sizeId, qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((sizeId: string, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((l) => l.sizeId !== sizeId)
        : current.map((l) => (l.sizeId === sizeId ? { ...l, qty: Math.min(50, qty) } : l)),
    );
  }, []);

  const remove = useCallback((sizeId: string) => {
    setLines((current) => current.filter((l) => l.sizeId !== sizeId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totals = useMemo(() => priceCart(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      totals,
      ready,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, totals, ready, isOpen, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
