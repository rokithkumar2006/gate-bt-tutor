// Decorative DNA double-helix SVG used on the landing page and empty states.

export default function DnaPattern({ className = '', opacity = 1 }: { className?: string; opacity?: number }) {
  const rungs = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg viewBox="0 0 120 400" className={className} fill="none" style={{ opacity }} aria-hidden>
      <defs>
        <linearGradient id="dna-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="dna-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      {rungs.map((i) => {
        const y = 20 + i * 32;
        const phase = Math.sin(i * 0.65) * 34;
        return (
          <line key={i} x1={60 - phase} y1={y} x2={60 + phase} y2={y} stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        );
      })}
      <path
        d="M 60 0 C 130 40, -10 80, 60 120 C 130 160, -10 200, 60 240 C 130 280, -10 320, 60 360 C 130 400, -10 440, 60 480"
        stroke="url(#dna-a)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 60 0 C -10 40, 130 80, 60 120 C -10 160, 130 200, 60 240 C -10 280, 130 320, 60 360 C -10 400, 130 440, 60 480"
        stroke="url(#dna-b)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
