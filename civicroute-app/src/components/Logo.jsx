// CivicRoute SVG Logo — inline so it works without external image URLs
export default function Logo({ className = 'h-8 w-auto' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CivicRoute"
    >
      {/* Map pin icon */}
      <circle cx="12" cy="12" r="8" fill="#2d1e18" />
      <circle cx="12" cy="10" r="3" fill="#ffffff" />
      <path d="M12 18 L12 24" stroke="#2d1e18" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="25" r="2" fill="#2d1e18" />
      {/* Text */}
      <text
        x="26"
        y="20"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#140804"
        letterSpacing="-0.3"
      >
        CivicRoute
      </text>
    </svg>
  );
}
