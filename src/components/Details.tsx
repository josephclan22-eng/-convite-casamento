import { useScrollReveal } from "../hooks/useScrollReveal"
import DecorativeDivider from "./DecorativeDivider"

const schedule = [
  {
    time: "16:00",
    label: "Cerimônia Religiosa",
    desc: "Igreja Matriz São Sebastião",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    time: "17:30",
    label: "Cocktail",
    desc: "Salão Villa Verde",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M6 8l6 4 6-4M6 12l6 4 6-4M6 16l6 4 6-4" />
        <path d="M12 6v8" />
      </svg>
    ),
  },
  {
    time: "18:30",
    label: "Jantar & Festa",
    desc: "Salão Villa Verde",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

export default function Details() {
  const ref = useScrollReveal()

  return (
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-rose-light/50 to-transparent" ref={ref}>
      <div className="scroll-reveal max-w-3xl mx-auto text-center">
        <DecorativeDivider variant="diamond" />

        <p className="font-garamond text-gold-dark text-xl italic mb-3">
          Cerimônia & Festa
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
          Detalhes do grande dia
        </h2>

        <div className="mt-12 space-y-4 md:space-y-6">
          {schedule.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 border border-gold/10 bg-cream/60 backdrop-blur-sm hover:border-gold/30 hover:bg-cream/80 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-14 sm:w-16 md:w-20 text-center">
                <span className="font-serif text-sm sm:text-lg md:text-xl font-bold text-gold-dark">{item.time}</span>
              </div>
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-gold/20 rounded-full group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                {item.icon}
              </div>
              <div className="text-left flex-1">
                <h3 className="font-serif text-base sm:text-lg md:text-xl text-ink">{item.label}</h3>
                <p className="font-garamond text-muted text-sm sm:text-base italic mt-0.5 sm:mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 sm:p-8 border border-gold/20 bg-cream/70 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
            <span className="font-sans text-[10px] sm:text-xs text-muted tracking-[0.15em] uppercase">Localização</span>
          </div>
          <a
            href="https://maps.app.goo.gl/N3JZWwFED7yjsbVy5"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <p className="font-garamond text-ink-light text-base sm:text-lg mb-1 group-hover:text-gold-dark transition-colors">
              Igreja Matriz São Sebastião
            </p>
            <p className="font-garamond text-muted text-sm sm:text-base italic">Salão Villa Verde — Traje: Esporte Fino</p>
          </a>
        </div>

        <DecorativeDivider variant="diamond" />
      </div>
    </section>
  )
}
