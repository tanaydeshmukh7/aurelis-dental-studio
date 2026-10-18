interface BrandMarkProps {
  className?: string;
  size?: number;
  variant?: "espresso" | "white" | "sage" | "champagne";
}

export default function BrandMark({
  className = "w-6 h-6",
  size,
  variant = "espresso",
}: BrandMarkProps) {
  const colorMap = {
    espresso: "text-espresso",
    white: "text-white",
    sage: "text-sage",
    champagne: "text-champagne",
  };

  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${colorMap[variant]} ${className} shrink-0 transition-colors`}
      style={style}
      aria-hidden="true"
    >
      {/* Refined A-monogram with organic apex and botanical leaf crossbar */}
      <path
        d="M6.5 30.5L17.15 6.8C17.48 6.07 18.52 6.07 18.85 6.8L29.5 30.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gentle organic leaf crossbar */}
      <path
        d="M10.8 22.5C14.2 19.8 21.8 19.8 25.2 22.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Subtle sprouting botanical leaflet detail */}
      <path
        d="M18 21C18 17 20.8 14.5 20.8 14.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Micro crown focal dot */}
      <circle cx="18" cy="9.2" r="0.9" fill="currentColor" />
    </svg>
  );
}
