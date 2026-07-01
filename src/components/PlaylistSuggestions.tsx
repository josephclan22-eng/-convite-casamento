import { useScrollReveal } from "../hooks/useScrollReveal"
import DecorativeDivider from "./DecorativeDivider"

const songs = [
  { title: "Trem Bala", artist: "Ana Vilela" },
  { title: "Amei Te Ver", artist: "Tiago Iorc" },
  { title: "Final de Tarde", artist: "César Menotti & Fabiano" },
  { title: "Deus Cuida de Mim", artist: "Kleber Lucas" },
  { title: "Nós Dois", artist: "Nando Reis" },
]

export default function PlaylistSuggestions() {
  const ref = useScrollReveal()

  return (
    <section className="py-24 md:py-32 px-6" ref={ref}>
      <div className="scroll-reveal max-w-2xl mx-auto text-center">
        <DecorativeDivider variant="floral" />

        <p className="font-garamond text-gold-dark text-xl italic mb-3">
          Música
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
          Trilha sonora do nosso amor
        </h2>
        <p className="font-garamond text-ink-light text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          Músicas que marcam nossa história e vão embalar essa noite especial
        </p>

        <div className="space-y-3 max-w-md mx-auto">
          {songs.map((song, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border border-gold/10 bg-cream/50 group hover:border-gold/30 hover:bg-cream/80 transition-all duration-300 cursor-pointer"
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-gold/20 rounded-full group-hover:border-gold/50 transition-all">
                <svg className="w-4 h-4 text-gold/60 group-hover:text-gold/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-serif text-lg text-ink group-hover:text-gold-dark transition-colors">
                  {song.title}
                </p>
                <p className="font-garamond text-muted italic text-sm">{song.artist}</p>
              </div>
              <span className="font-sans text-[10px] text-muted/50 tracking-wider">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <DecorativeDivider variant="floral" />
      </div>
    </section>
  )
}
