import { useScrollReveal } from "../hooks/useScrollReveal"
import DecorativeDivider from "./DecorativeDivider"

const schedule = [
  { time: "16:00", label: "Cerimônia Religiosa", icon: "⛪", desc: "Igreja Matriz São Sebastião" },
  { time: "17:30", label: "Cocktail", icon: "🥂", desc: "Salão Villa Verde" },
  { time: "18:30", label: "Jantar & Festa", icon: "🎶", desc: "Salão Villa Verde" },
]

export default function Details() {
  const ref = useScrollReveal()

  return (
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-rose-light/50 to-transparent" ref={ref}>
      <div className="scroll-reveal max-w-3xl mx-auto text-center">
        <DecorativeDivider variant="rings" />

        <p className="font-garamond text-gold-dark text-xl italic mb-3">
          Cerimônia & Festa
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
          Detalhes do grande dia
        </h2>

        <div className="mt-12 space-y-6">
          {schedule.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 p-6 border border-gold/10 bg-cream/60 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-16 md:w-20 text-center">
                <span className="font-serif text-lg md:text-xl font-bold text-gold-dark">{item.time}</span>
              </div>
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20 rounded-full text-lg group-hover:border-gold/50 transition-all duration-300">
                {item.icon}
              </div>
              <div className="text-left flex-1">
                <h3 className="font-serif text-lg md:text-xl text-ink">{item.label}</h3>
                <p className="font-garamond text-muted text-base italic mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-8 border border-gold/20 bg-cream/70 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
            <span className="font-sans text-xs text-muted tracking-[0.15em] uppercase">Localização</span>
          </div>
          <p className="font-garamond text-ink-light text-lg mb-1">Igreja Matriz São Sebastião</p>
          <p className="font-garamond text-muted text-base italic">Salão Villa Verde — Traje: Esporte Fino</p>
        </div>

        <DecorativeDivider variant="rings" />
      </div>
    </section>
  )
}
