import { useCountdown } from "../hooks/useCountdown"
import { useScrollReveal } from "../hooks/useScrollReveal"

function CountdownBlock({ value, label }: { value: number; label: string }) {
  const digits = String(value).padStart(2, "0").split("")

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center border border-gold/20 bg-cream/70 backdrop-blur-sm transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-lg group-hover:shadow-gold/5">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40" />
        <div className="flex gap-0.5 sm:gap-1 md:gap-1.5">
          {digits.map((d, i) => (
            <span
              key={`${d}-${i}`}
              className="font-serif text-xl sm:text-3xl md:text-5xl font-bold text-ink tabular-nums countdown-digit"
              style={{
                animation: value !== 0 ? `countdown-tick 0.3s ease-out ${i * 0.05}s` : undefined,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <span className="font-sans text-[8px] sm:text-[10px] md:text-xs text-muted tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-2 sm:mt-3">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const time = useCountdown()
  const ref = useScrollReveal()

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-rose/35 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gold/15 rounded-full blur-3xl" />
      </div>

      <div className="scroll-reveal max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-8 h-px bg-gold/50" />
          <svg className="w-4 h-4 text-gold/70 animate-ring" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="6" />
            <circle cx="16" cy="8" r="2.5" />
          </svg>
          <span className="block w-8 h-px bg-gold/50" />
        </div>

        <p className="font-garamond text-gold-dark text-xl md:text-2xl italic mb-3">
          Faltam
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
          Para o grande dia
        </h2>

        <div className="mt-8 sm:mt-12 flex justify-center gap-1 sm:gap-3 md:gap-6">
          <CountdownBlock value={time.days} label="Dias" />
          <span className="font-serif text-xl sm:text-3xl md:text-4xl text-gold/50 self-start mt-0.5 sm:mt-1 md:mt-3">:</span>
          <CountdownBlock value={time.hours} label="Horas" />
          <span className="font-serif text-xl sm:text-3xl md:text-4xl text-gold/50 self-start mt-0.5 sm:mt-1 md:mt-3">:</span>
          <CountdownBlock value={time.minutes} label="Minutos" />
          <span className="font-serif text-xl sm:text-3xl md:text-4xl text-gold/50 self-start mt-0.5 sm:mt-1 md:mt-3">:</span>
          <CountdownBlock value={time.seconds} label="Segundos" />
        </div>

        <div className="mt-10 sm:mt-16 flex justify-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="block w-2 h-2 rounded-full bg-gold/40"
              style={{ animation: `pulse-soft 2s ease-in-out ${i * 0.3}s infinite` }}
            />
          ))}
        </div>

        <div className="mt-6 sm:mt-8 font-garamond text-muted text-base italic">
          {time.days > 0
            ? `Faltam ${time.days} dias para o sim mais esperado`
            : "Hoje é o grande dia!"}
        </div>
      </div>
    </section>
  )
}
