export function SquiggleUnderline() {
  return (
    <svg
      className="absolute -bottom-2 left-0 w-full text-primary/50"
      height="8"
      viewBox="0 0 400 8"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,4 Q50,0 100,4 T200,4 T300,4 T400,4"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
