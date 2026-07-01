import { useScrollReveal } from "../hooks/useScrollReveal"
import DecorativeDivider from "./DecorativeDivider"

const songs = [
  { title: "Trem Bala", artist: "Ana Vilela", emoji: "🚂" },
  { title: "Amei Te Ver", artist: "Tiago Iorc", emoji: "💛" },
  { title: "Final de Tarde", artist: "César Menotti & Fabiano", emoji: "🌅" },
  { title: "Deus Cuida de Mim", artist: "Kleber Lucas", emoji: "🙏" },
  { title: "Nós Dois", artist: "Nando Reis", emoji: "🎵" },
]

export default function PlaylistSuggestions() {
  const ref = useScrollReveal()

  return (
    <section className="py-24 md:py-32 px-6" ref={ref}>
      <div className="scroll-reveal max-w-2xl mx-auto text-center">
        <DecorativeDivider variant="hearts" />

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
              className="flex items-center gap-4 p-4 border border-gold/10 bg-cream/50 group hover:border-gold/30 transition-all duration-300 cursor-pointer"
            >
              <span className="text-2xl">{song.emoji}</span>
              <div className="flex-1 text-left">
                <p className="font-serif text-lg text-ink group-hover:text-gold-dark transition-colors">
                  {song.title}
                </p>
                <p className="font-garamond text-muted italic text-sm">{song.artist}</p>
              </div>
              <svg className="w-5 h-5 text-gold/60 group-hover:text-gold/80 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
          ))}
        </div>

        <DecorativeDivider variant="hearts" />
      </div>
    </section>
  )
}
