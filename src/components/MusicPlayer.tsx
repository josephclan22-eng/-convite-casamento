import { useEffect, useRef, useState } from "react"

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const interacted = useRef(false)

  useEffect(() => {
    const audio = new Audio("/music/trem-bala.webm")
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {}) // autoplay blocked

    function handleInteraction() {
      if (interacted.current) return
      interacted.current = true
      const a = audioRef.current
      if (a && a.paused) {
        a.play()
          .then(() => setPlaying(true))
          .catch(() => {})
      }
    }

    document.addEventListener("click", handleInteraction, { once: true })
    document.addEventListener("touchstart", handleInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
      audio.pause()
      audio.src = ""
    }
  }, [])

  function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const a = audioRef.current
    if (!a) return

    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 shadow-lg backdrop-blur-sm ${
        playing
          ? "bg-gold text-cream border-gold shadow-gold/20"
          : "bg-cream/80 text-gold-dark border-gold/30 hover:bg-gold hover:text-cream hover:border-gold"
      }`}
      aria-label={playing ? "Pausar" : "Tocar"}
    >
      {playing ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      )}
    </button>
  )
}
