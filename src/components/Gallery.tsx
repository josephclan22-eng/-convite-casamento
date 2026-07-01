import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"

const cards = [
  {
    label: "Elivaldo",
    desc: "O noivo",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    quote: "O amor é a asa que Deus deu à alma para voar até Ele",
  },
  {
    label: "Sara",
    desc: "A noiva",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
      </svg>
    ),
    quote: "Amar não é olhar um para o outro, é olhar juntos na mesma direção",
  },
  {
    label: "Os Dois",
    desc: "O amor",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="6" />
        <circle cx="16" cy="8" r="2.5" />
      </svg>
    ),
    quote: "O verdadeiro amor não tem fim",
  },
]

export default function Gallery() {
  const ref = useScrollReveal()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 px-6" ref={ref}>
      <div className="scroll-reveal max-w-5xl mx-auto">
        <p className="font-garamond text-gold-dark text-xl italic text-center mb-3">
          Momentos
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-4">
          Guardados no coração
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden border border-gold/10 bg-gradient-to-b from-cream-dark to-cream transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 transition-all duration-500">
                <div className="mb-4 p-4 rounded-full border border-gold/20 group-hover:border-gold/40 transition-all duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="font-serif text-2xl md:text-3xl text-ink mb-2">{item.label}</span>
                <span className="font-garamond text-muted text-lg italic">{item.desc}</span>
              </div>

              <div
                className="absolute inset-0 flex items-center justify-center bg-cream/95 backdrop-blur-sm p-8 transition-all duration-500"
                style={{
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <div>
                  <svg className="w-5 h-5 text-gold/40 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <p className="font-garamond text-ink-light text-lg italic leading-relaxed mb-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <span className="font-sans text-xs text-gold-dark tracking-[0.15em] uppercase">
                    &mdash; Elivaldo &amp; Sara
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
