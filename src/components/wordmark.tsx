import Image from "next/image";

/**
 * The Sea Moss Me horizontal lockup. Two artwork files: the standard mark for
 * light backgrounds, and a cream recolour for dark ones.
 */
export function Wordmark({
  tone = "dark",
  className = "",
  priority = false,
}: {
  /** "dark" = deep-teal artwork for cream backgrounds. "light" = cream artwork. */
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "light" ? "/images/logo-lockup-light.png" : "/images/logo-lockup.png"}
      alt="Sea Moss Me — peak health is true wealth"
      width={1024}
      height={200}
      priority={priority}
      sizes="260px"
      className={`h-11 w-auto ${className}`}
    />
  );
}

export function LogoMark({
  tone = "dark",
  className = "size-10",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Image
      src={tone === "light" ? "/images/logo-mark-light.png" : "/images/logo-mark.png"}
      alt=""
      aria-hidden
      width={512}
      height={512}
      sizes="80px"
      className={`w-auto ${className}`}
    />
  );
}
