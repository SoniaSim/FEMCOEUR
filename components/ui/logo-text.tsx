export function LogoText({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold ${className}`}>
      <span className="text-secondary">FEM</span>
      <span className="text-primary">COEUR</span>
    </span>
  );
}

