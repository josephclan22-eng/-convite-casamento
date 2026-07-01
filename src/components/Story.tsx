import { useScrollReveal } from "../hooks/useScrollReveal"
import DecorativeDivider from "./DecorativeDivider"

const milestones = [
  {
    date: "O Primeiro Encontro",
    desc: "O começo de tudo",
    text: "Dois olhares que se cruzaram e souberam que era o começo de algo eterno. O acaso os uniu, mas o destino os escolheu. Nunca mais foram os mesmos depois daquele dia.",
  },
  {
    date: "O Pedido",
    desc: "Um momento inesquecível",
    text: "Em um momento que parecia parado no tempo, uma pergunta simples carregava o peso de uma vida inteira. O sim veio antes mesmo das palavras, nos olhos brilhando de felicidade.",
  },
  {
    date: "O Sim",
    desc: "06 de setembro de 2026",
    text: "Elivaldo e Sara celebrarão não apenas o amor que sentem, mas a promessa de construir uma vida juntos, lado a lado, para sempre.",
  },
]

export default function Story() {
  const ref = useScrollReveal()

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
        <DecorativeDivider variant="floral" />

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
              className="relative pl-10 sm:pl-12 md:pl-20 border-l border-gold/30 group"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-2 border-gold/50 bg-cream flex items-center justify-center group-hover:border-gold transition-all duration-500 group-hover:shadow-lg group-hover:shadow-gold/20">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-dark" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <div className="pt-1 pb-4">
                <span className="font-sans text-[10px] sm:text-xs text-gold-dark tracking-[0.25em] uppercase">
                  {item.date}
                </span>
                <span className="font-garamond text-muted text-sm italic ml-2">
                  — {item.desc}
                </span>
                <p className="font-garamond text-ink-light text-base sm:text-lg md:text-xl leading-relaxed mt-3 italic">
                  "{item.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-script text-4xl md:text-5xl text-gold-dark/60">
            &amp;
          </p>
        </div>

        <DecorativeDivider variant="floral" />
      </div>
    </section>
  )
}
