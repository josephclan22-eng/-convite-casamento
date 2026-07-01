import { useScrollReveal } from "../hooks/useScrollReveal"
import DecorativeDivider from "./DecorativeDivider"

export default function GiftList() {
  const ref = useScrollReveal()

  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-rose-light/40 to-transparent" ref={ref}>
      <div className="scroll-reveal max-w-2xl mx-auto text-center">
        <DecorativeDivider variant="rings" />

        <p className="font-garamond text-gold-dark text-xl italic mb-3">
          Lista de Presentes
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
          O presente é sua presença
        </h2>
        <p className="font-garamond text-ink-light text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          Se quiser nos presentear, sua presença já é o maior presente. Mas se sentir vontade, preparamos uma sugestão:
        </p>

        <div className="max-w-md mx-auto p-6 sm:p-8 border border-gold/20 bg-cream/70 backdrop-blur-sm hover:border-gold/40 transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-gold/20 rounded-full">
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h3 className="font-serif text-2xl text-ink mb-2">Contribuição via PIX</h3>
          <p className="font-garamond text-muted text-lg italic mb-6">
            Chave PIX (CPF/CNPJ)
          </p>

          <div className="p-4 border border-dashed border-gold/30 bg-cream-dark/50">
            <p className="font-mono text-sm text-ink-light tracking-wider select-all">
              00.000.000/0001-00
            </p>
          </div>

          <p className="font-sans text-[10px] text-muted tracking-[0.1em] mt-4">
            Qualquer valor será recebido com imenso carinho 💛
          </p>
        </div>

        <DecorativeDivider variant="rings" />
      </div>
    </section>
  )
}
