export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-gold/20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-rose/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-gold/40 rounded-full">
          <svg className="w-7 h-7 text-gold animate-heart-beat" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>

        <p className="font-script text-3xl md:text-4xl text-ink mb-1">
          Elivaldo <span className="font-script-alt text-gold-light text-2xl md:text-3xl">&amp;</span> Sara
        </p>
        <p className="font-garamond text-muted text-lg italic mb-4">
          Unidos pelo amor em 06.09.2026
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="block w-8 h-px bg-gold/40" />
          <svg className="w-4 h-4 text-gold/65 animate-ring" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="6" />
            <circle cx="16" cy="8" r="2.5" />
          </svg>
          <span className="block w-8 h-px bg-gold/40" />
        </div>

        <p className="font-sans text-[10px] text-muted/60 tracking-[0.15em] leading-relaxed">
          Feito com carinho para celebrar o amor que inspira tudo ao redor.
        </p>
      </div>
    </footer>
  )
}
