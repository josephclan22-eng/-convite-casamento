import { useEffect, useRef, useState } from "react"

export default function MusicPlayer() {
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const ready = useRef(false)

  useEffect(() => {
    function play() {
      if (ready.current) return
      const a = audioRef.current
      if (!a) return
      ready.current = true
      a.play().then(() => {
        setVisible(true)
      }).catch(() => {})
    }

    const a = audioRef.current
    if (a) a.play().then(() => setVisible(true)).catch(() => {})

    for (const e of ["click", "touchstart", "touchend", "keydown", "scroll"]) {
      document.addEventListener(e, play, { once: true })
    }

    return () => {
      for (const e of ["click", "touchstart", "touchend", "keydown", "scroll"]) {
        document.removeEventListener(e, play)
      }
    }
  }, [])

  function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play().then(() => setVisible(true)).catch(() => {})
    } else {
      a.pause()
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/trem-bala.mp3" preload="auto" loop playsInline />
      {visible && (
        <button
          type="button"
          onClick={toggle}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border bg-cream/80 text-gold-dark border-gold/30 hover:bg-gold hover:text-cream hover:border-gold transition-all duration-300 shadow-lg backdrop-blur-sm"
          aria-label="Pausar"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>
      )}
    </>
  )
}
