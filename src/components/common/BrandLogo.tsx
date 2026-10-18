import Link from "next/link";
import BrandMark from "./BrandMark";

interface BrandLogoProps {
  variant?: "dark" | "light" | "sage";
  showMark?: boolean;
  markPosition?: "left" | "top";
  className?: string;
  onClick?: () => void;
}

export default function BrandLogo({
  variant = "dark",
  showMark = true,
  markPosition = "left",
  className = "",
  onClick,
}: BrandLogoProps) {
  const isLight = variant === "light";
  const isSage = variant === "sage";

  const markVariant = isLight ? "white" : isSage ? "sage" : "espresso";
  const primaryTextColor = isLight ? "text-white" : "text-espresso";
  const secondaryTextColor = isLight
    ? "text-ivory/70"
    : isSage
    ? "text-sage-dark"
    : "text-taupe";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex ${
        markPosition === "left"
          ? "items-center gap-2.5 sm:gap-3"
          : "flex-col items-start gap-1.5"
      } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage ${className}`}
      aria-label="AURELIS Dental Studio Homepage"
    >
      {showMark && (
        <div className="w-8 h-8 rounded-full bg-sand/30 flex items-center justify-center p-1 group-hover:bg-sage/15 transition-colors">
          <BrandMark
            variant={markVariant}
            className="w-5 h-5 group-hover:text-sage transition-colors"
          />
        </div>
      )}

      <div className="flex flex-col leading-none">
        <span
          className={`font-serif text-xl sm:text-2xl tracking-[0.22em] uppercase font-light leading-none transition-colors duration-300 ${primaryTextColor} group-hover:text-sage`}
        >
          AURELIS
        </span>
        <span
          className={`font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.32em] uppercase font-medium mt-1 transition-colors ${secondaryTextColor}`}
        >
          Dental Studio · Pune
        </span>
      </div>
    </Link>
  );
}
