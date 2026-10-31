// The site's asterisk mark, drawn rather than typed so it stays identical in
// the nav, the hero orb, and the favicon.
export function Mark({ className, size = 24 }: { className?: string; size?: number }) {
  const spokes = Array.from({ length: 8 }, (_, index) => {
    const angle = (index * Math.PI) / 4
    const inner = 17
    const outer = index % 2 === 0 ? 46 : 36
    return {
      x1: 50 + Math.cos(angle) * inner,
      y1: 50 + Math.sin(angle) * inner,
      x2: 50 + Math.cos(angle) * outer,
      y2: 50 + Math.sin(angle) * outer,
    }
  })

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {spokes.map((spoke, index) => (
        <line
          key={index}
          x1={spoke.x1}
          y1={spoke.y1}
          x2={spoke.x2}
          y2={spoke.y2}
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}
      <circle cx="50" cy="50" r="4.5" fill="currentColor" />
    </svg>
  )
}
