import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"

const cards = [
  { label: "Elivaldo", desc: "O noivo", emoji: "\uD83D\uDC9B", quote: "O amor e a asa que Deus deu a alma para voar ate Ele" },
  { label: "Sara", desc: "A noiva", emoji: "\uD83C\uDF39", quote: "Amar nao e olhar um para o outro, e olhar juntos na mesma direcao" },
  { label: "Os Dois", desc: "O amor", emoji: "\uD83D\uDC8D", quote: "O verdadeiro amor nao tem fim" },
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
          Guardados no coracao
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
                <span className="text-4xl md:text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">
                  {item.emoji}
                </span>
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
