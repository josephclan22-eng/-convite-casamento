export default function DecorativeDivider({ variant = "rings" }: { variant?: "rings" | "hearts" | "line" | "floral" | "diamond" }) {
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
        <svg className="w-4 h-4 text-gold/65 animate-gentle-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="block w-8 h-px bg-gold/40" />
      </div>
    )
  }

  if (variant === "diamond") {
    return (
      <div className="flex items-center justify-center gap-3 py-8">
        <span className="block w-8 h-px bg-gold/30" />
        <svg className="w-4 h-4 text-gold/50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 9l10 7 10-7-10-7zM2 16l10 7 10-7" />
        </svg>
        <span className="block w-8 h-px bg-gold/30" />
      </div>
    )
  }

  if (variant === "floral") {
    return (
      <div className="flex items-center justify-center gap-4 py-8">
        <span className="block w-8 h-px bg-gold/30" />
        <svg className="w-6 h-6 text-gold/50 animate-gentle-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2C9.5 2 7 4.5 7 7c0 2.5 2.5 5 5 5s5-2.5 5-5c0-2.5-2.5-5-5-5z" />
          <path d="M12 12c-2.5 0-5 2.5-5 5s2.5 5 5 5 5-2.5 5-5-2.5-5-5-5z" />
          <path d="M12 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z" />
        </svg>
        <span className="block w-8 h-px bg-gold/30" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <span className="block w-8 h-px bg-gold/40" />
      <div className="relative flex items-center justify-center">
        <svg className="w-5 h-5 text-gold/65 animate-ring" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
          <circle cx="16" cy="8" r="2.5" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="block w-8 h-px bg-gold/40" />
    </div>
  )
}
