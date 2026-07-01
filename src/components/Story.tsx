import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import DecorativeDivider from "./DecorativeDivider"

const milestones = [
  {
    date: "O Primeiro Encontro",
    icon: "✨",
    text: "Dois olhares que se cruzaram e souberam que era o começo de algo eterno. O acaso os uniu, mas o destino os escolheu. Nunca mais foram os mesmos depois daquele dia.",
  },
  {
    date: "O Pedido",
    icon: "💍",
    text: "Em um momento que parecia parado no tempo, uma pergunta simples carregava o peso de uma vida inteira. O sim veio antes mesmo das palavras, nos olhos brilhando de felicidade.",
  },
  {
    date: "O Sim",
    icon: "💛",
    text: "No dia 6 de setembro de 2026, Elivaldo e Sara celebrarão não apenas o amor que sentem, mas a promessa de construir uma vida juntos, lado a lado, para sempre.",
  },
]

export default function Story() {
  const ref = useScrollReveal()
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-rose-light/60 to-transparent" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-gold/5 text-8xl font-serif select-none"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 15}%`,
              transform: `rotate(${i * 10}deg)`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="scroll-reveal max-w-3xl mx-auto relative z-10">
        <DecorativeDivider variant="hearts" />

        <p className="font-garamond text-gold-dark text-xl italic text-center mb-3">
          Nossa história
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-4">
          Uma jornada de amor
        </h2>

        <div className="mt-16 space-y-16 md:space-y-20">
          {milestones.map((item, i) => (
            <div
              key={i}
              className="relative pl-10 sm:pl-12 md:pl-20 border-l-2 border-gold/40 cursor-pointer group"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-gold/60 bg-cream flex items-center justify-center text-[10px] sm:text-sm group-hover:border-gold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold/20">
                {item.icon}
              </div>

              <div className="pt-1 pb-4">
                <span className="font-sans text-xs text-gold-dark tracking-[0.2em] uppercase">
                  {item.date}
                </span>
                <p className="font-garamond text-ink-light text-base sm:text-lg md:text-xl leading-relaxed mt-2 sm:mt-3 italic transition-all duration-300">
                  "{item.text}"
                </p>
                {expanded === i && (
                  <div className="mt-4 font-garamond text-muted text-base leading-relaxed animate-fade-in-up">
                    "O amor verdadeiro não tem final feliz, porque o amor verdadeiro simplesmente não termina."
                  </div>
                )}
                <span className="inline-block mt-3 font-sans text-[10px] text-gold/70 tracking-[0.1em] uppercase">
                  {expanded === i ? "— Clique para recolher" : "— Clique para ler mais"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <DecorativeDivider variant="hearts" />
      </div>
    </section>
  )
}
