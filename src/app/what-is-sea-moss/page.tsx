import { permanentRedirect } from "next/navigation";

/**
 * "What sea moss is" now lives at the top of Sea Moss 101. next.config.ts
 * redirects this URL before it renders; this is the fallback.
 */
export default function WhatIsSeaMossPage() {
  permanentRedirect("/sea-moss");
}
