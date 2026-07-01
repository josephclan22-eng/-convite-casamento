import { useState, useEffect } from "react"

const subtitles = [
  "Convidam você para celebrar o amor",
  "O amor é a poesia dos sentidos",
  "Duas almas, um só coração",
  "A história mais bonita está prestes a começar",
]

export default function Hero() {
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const id = setInterval(() => {
      setSubtitleIdx((i) => (i + 1) % subtitles.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-rose-light/80 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(201,168,76,0.15) 0%, transparent 60%)`,
        }}
      />

      <div className="absolute top-16 left-8 md:left-16 w-12 h-12 text-gold/60 animate-float-slow hidden sm:block">
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full animate-ring">
          <circle cx="20" cy="20" r="14" />
          <circle cx="28" cy="14" r="5" />
          <circle cx="28" cy="14" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-10 md:right-24 w-8 h-8 text-gold/50 animate-float-slow hidden sm:block" style={{ animationDelay: "2s" }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-heart-beat">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-8 md:right-20 w-6 h-6 text-rose/70 animate-float-slow hidden sm:block" style={{ animationDelay: "3s" }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gold/60 rounded-full animate-sparkle"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${2 + (i % 2)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="animate-fade-in-down">
          <p className="font-serif text-gold-dark text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight select-none">
            Convite para o Casamento
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
              <span className="block w-12 md:w-20 h-px bg-gold/60" />
            <span className="font-garamond text-gold-dark text-sm md:text-lg tracking-[0.3em] uppercase">
              Save the date
            </span>
            <span className="block w-12 md:w-20 h-px bg-gold/60" />
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            <span className="block text-ink relative inline-block">
              Elivaldo
              <span className="absolute -top-3 -right-4 text-gold/70 text-lg animate-heart-beat">✦</span>
            </span>
            <span className="block text-gold font-light italic text-3xl md:text-4xl lg:text-5xl my-2 md:my-3">
              &amp;
            </span>
            <span className="block text-ink">Sara</span>
          </h1>
        </div>

        <div className="animate-fade-in-up mt-8" style={{ animationDelay: "0.6s" }}>
          <div className="w-16 h-0.5 bg-gold/70 mx-auto mb-6 rounded-full" />
          <p className="font-garamond text-ink-light text-lg md:text-2xl italic transition-all duration-700 min-h-[2em]">
            "{subtitles[subtitleIdx]}"
          </p>
        </div>

        <div className="animate-fade-in-up mt-8" style={{ animationDelay: "0.9s" }}>
          <div className="inline-flex items-center gap-4 px-6 py-2 border border-gold/40 rounded-full bg-cream/60 backdrop-blur-sm">
            <span className="font-sans text-muted text-xs md:text-sm tracking-[0.15em] uppercase">
              06
            </span>
            <span className="text-gold/60">·</span>
            <span className="font-sans text-muted text-xs md:text-sm tracking-[0.15em] uppercase">
              09
            </span>
            <span className="text-gold/60">·</span>
            <span className="font-sans text-muted text-xs md:text-sm tracking-[0.15em] uppercase">
              2026
            </span>
          </div>
        </div>

        <div className="animate-fade-in mt-12" style={{ animationDelay: "1.2s" }}>
          <a
            href="#rsvp"
            className="group relative inline-block px-10 py-4 overflow-hidden"
          >
            <span className="absolute inset-0 border-2 border-gold transition-all duration-300 group-hover:bg-gold" />
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 font-sans text-gold-dark group-hover:text-cream text-sm tracking-[0.2em] uppercase transition-colors duration-300">
              Confirme sua presença
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-sans text-[10px] text-muted/80 tracking-[0.2em] uppercase">
          Role
        </span>
        <svg className="w-4 h-4 text-gold/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
