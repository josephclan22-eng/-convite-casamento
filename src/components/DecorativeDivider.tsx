export default function DecorativeDivider({ variant = "rings" }: { variant?: "rings" | "hearts" | "line" }) {
  if (variant === "line") {
    return (
      <div className="flex items-center justify-center gap-4 py-8">
        <span className="block w-12 h-px bg-gold/50" />
        <span className="block w-2 h-2 rotate-45 border border-gold/70" />
        <span className="block w-12 h-px bg-gold/50" />
      </div>
    )
  }

  if (variant === "hearts") {
    return (
      <div className="flex items-center justify-center gap-3 py-8">
        <span className="block w-8 h-px bg-gold/40" />
        <svg className="w-4 h-4 text-gold/65" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="block w-8 h-px bg-gold/40" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <span className="block w-8 h-px bg-gold/40" />
      <svg className="w-5 h-5 text-gold/65 animate-ring" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
        <circle cx="16" cy="8" r="2.5" strokeWidth="1.5" />
      </svg>
      <span className="block w-8 h-px bg-gold/40" />
    </div>
  )
}
