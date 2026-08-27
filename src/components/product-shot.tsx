import Image from "next/image";
import type { Product } from "@/lib/products";

/**
 * Product photography is shot on pure white. `mix-blend-multiply` lets the
 * white drop away against the tinted panel behind it, so the jar sits on the
 * flavour colour without needing cut-out PNGs.
 */
export function ProductShot({
  product,
  sizes = "(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw",
  priority = false,
  className = "",
  imageClassName = "",
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: product.accentSoft }}>
      <Image
        src={product.image}
        alt={`${product.name} — wildcrafted Jamaican sea moss gel`}
        width={600}
        height={750}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full object-cover mix-blend-multiply ${imageClassName}`}
      />
    </div>
  );
}

/** Small square thumbnail for the cart drawer and cart page. */
export function ProductThumb({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm ${className}`}
      style={{ backgroundColor: product.accentSoft }}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={250}
        sizes="120px"
        className="h-full w-full object-cover object-top mix-blend-multiply"
      />
    </div>
  );
}
