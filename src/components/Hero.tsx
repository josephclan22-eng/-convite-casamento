import { useState, useEffect } from "react"

const subtitles = [
  "Convidam você para celebrar o amor",
  "O amor é a poesia dos sentidos",
  "Duas almas, um só coração",
  "A história mais bonita está prestes a começar",
]

function OrnamentTop() {
  return (
    <svg className="w-48 md:w-64 text-gold/25 mx-auto" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M0 20 Q25 0 50 20 Q75 40 100 20 Q125 0 150 20 Q175 40 200 20" />
      <circle cx="50" cy="20" r="3" fill="currentColor" stroke="none" />
      <circle cx="100" cy="20" r="4" fill="currentColor" stroke="none" />
      <circle cx="150" cy="20" r="3" fill="currentColor" stroke="none" />
    </svg>
  )
}

function OrnamentBottom() {
  return (
    <svg className="w-48 md:w-64 text-gold/25 mx-auto rotate-180" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M0 20 Q25 0 50 20 Q75 40 100 20 Q125 0 150 20 Q175 40 200 20" />
      <circle cx="50" cy="20" r="3" fill="currentColor" stroke="none" />
      <circle cx="100" cy="20" r="4" fill="currentColor" stroke="none" />
      <circle cx="150" cy="20" r="3" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Hero() {
  const [subtitleIdx, setSubtitleIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSubtitleIdx((i) => (i + 1) % subtitles.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-[#fcf3e8] to-rose-light/80 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="absolute top-12 left-6 sm:left-12 md:left-20 w-8 h-8 text-gold/30 animate-gentle-pulse hidden sm:block">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="absolute top-24 right-6 sm:right-12 md:right-24 w-6 h-6 text-gold/20 animate-diamond hidden sm:block" style={{ animationDelay: "1s" }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 9l10 7 10-7-10-7zM2 16l10 7 10-7" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-8 sm:left-16 w-5 h-5 text-rose/60 animate-float-slow hidden sm:block" style={{ animationDelay: "2s" }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.5 2 7 4.5 7 7c0 2.5 2.5 5 5 5s5-2.5 5-5c0-2.5-2.5-5-5-5z" />
          <path d="M12 12c-2.5 0-5 2.5-5 5s2.5 5 5 5 5-2.5 5-5-2.5-5-5-5z" />
        </svg>
      </div>
      <div className="absolute bottom-40 right-8 sm:right-20 w-10 h-10 text-gold/15 animate-ring hidden sm:block" style={{ animationDelay: "3s" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <circle cx="17" cy="7" r="3" />
        </svg>
      </div>

      <div className="absolute top-1/3 left-6 sm:left-10 w-6 h-6 text-gold/25 animate-float-slow hidden sm:block" style={{ animationDelay: "1.5s" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <line x1="8" y1="6" x2="8" y2="18" />
          <line x1="10" y1="6" x2="10" y2="18" />
          <line x1="12" y1="6" x2="12" y2="18" />
          <line x1="14" y1="6" x2="14" y2="18" />
          <line x1="16" y1="6" x2="16" y2="18" />
          <rect x="8" y="6" width="8" height="4" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-6 sm:right-16 w-8 h-16 text-gold/20 animate-float-slow hidden sm:block" style={{ animationDelay: "4s" }}>
        <svg viewBox="0 0 8 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="2" y="0" width="4" height="18" rx="2" />
          <path d="M1 18 Q0 21 4 24 Q8 21 7 18" />
          <circle cx="4" cy="4" r="0.8" fill="currentColor" />
          <circle cx="4" cy="8" r="0.8" fill="currentColor" />
          <circle cx="4" cy="12" r="0.8" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gold/60 rounded-full animate-diamond"
            style={{
              left: `${5 + i * 6}%`,
              top: `${5 + (i % 6) * 16}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${1.5 + (i % 2) * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="animate-fade-in-down">
          <OrnamentTop />
          <p className="font-sans text-sm md:text-lg text-gold-dark/70 tracking-[0.35em] uppercase mb-6">
            Convite para o Casamento
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h1 className="mb-4">
            <span className="block font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ink leading-tight">
              Elivaldo
            </span>
            <span className="block font-script-alt text-3xl sm:text-4xl md:text-5xl text-gold-dark/80 font-light italic my-1 md:my-2">
              &amp;
            </span>
            <span className="block font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ink leading-tight">
              Sara
            </span>
          </h1>
        </div>

        <div className="animate-fade-in-up mt-6" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block w-10 md:w-16 h-px bg-gold/40" />
            <span className="font-garamond text-gold-dark text-lg md:text-xl tracking-[0.3em] uppercase font-medium">
              Reserve esta data
            </span>
            <span className="block w-10 md:w-16 h-px bg-gold/40" />
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-gold/30 bg-cream/70 backdrop-blur-sm">
            <span className="font-garamond text-muted text-sm md:text-base">A Cerimônia será no dia</span>
            <span className="font-sans text-ink text-base md:text-lg tracking-[0.15em] font-medium">
              06 - 09 - 2026
            </span>
          </div>
          <div className="mt-6">
            <OrnamentBottom />
          </div>
        </div>

        <div className="animate-fade-in-up mt-6" style={{ animationDelay: "0.9s" }}>
          <p className="font-garamond text-ink-light text-lg md:text-2xl italic transition-all duration-700 min-h-[2em]">
            "{subtitles[subtitleIdx]}"
          </p>
        </div>

        <div className="animate-fade-in mt-12" style={{ animationDelay: "1.1s" }}>
          <a
            href="#rsvp"
            className="group relative inline-block px-10 py-4 overflow-hidden"
          >
            <span className="absolute inset-0 border border-gold transition-all duration-300 group-hover:bg-gold group-hover:border-gold" />
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 font-sans text-gold-dark group-hover:text-cream text-sm tracking-[0.2em] uppercase transition-colors duration-300">
              Confirme sua presença
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-indicator">
        <span className="font-sans text-[10px] text-muted/70 tracking-[0.2em] uppercase">
          Role
        </span>
        <svg className="w-4 h-4 text-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
