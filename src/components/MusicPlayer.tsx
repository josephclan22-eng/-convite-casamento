import { useEffect, useRef, useState } from "react"

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const strategies = [
      () => audio.play(),
      () => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        if (ctx.state === "suspended") return ctx.resume()
        return Promise.resolve()
      },
    ]

    ;(async () => {
      for (const s of strategies) {
        try {
          await s()
        } catch {}
      }
    })()

    function start(e: Event) {
      if (started.current) return
      started.current = true
      e.preventDefault()
      e.stopPropagation()
      const a = audioRef.current
      if (a && a.paused) {
        a.play()
          .then(() => setPlaying(true))
          .catch(() => {})
      }
    }

    document.addEventListener("click", start, { once: true })
    document.addEventListener("touchstart", start, { once: true, passive: false })
    document.addEventListener("keydown", start, { once: true })
    document.addEventListener("scroll", start, { once: true })

    return () => {
      document.removeEventListener("click", start)
      document.removeEventListener("touchstart", start)
      document.removeEventListener("keydown", start)
      document.removeEventListener("scroll", start)
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
    <>
      <audio
        ref={audioRef}
        src="/music/trem-bala.webm"
        preload="auto"
        loop
        playsInline
      />
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
    </>
  )
}
