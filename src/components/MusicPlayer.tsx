import { useState, useEffect, useRef } from "react"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const YOUTUBE_ID = "SOJZdsXC47g"

export default function MusicPlayer() {
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.YT?.Player) {
      setReady(true)
      return
    }
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const first = document.getElementsByTagName("script")[0]
    first?.parentNode?.insertBefore(tag, first)

    window.onYouTubeIframeAPIReady = () => setReady(true)
  }, [])

  useEffect(() => {
    if (!ready || playerRef.current || !containerRef.current) return

    playerRef.current = new window.YT.Player(containerRef.current, {
      height: "0",
      width: "0",
      videoId: YOUTUBE_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        loop: 1,
        playlist: YOUTUBE_ID,
      },
      events: {
        onReady: () => setLoaded(true),
        onError: () => setLoaded(false),
      },
    })
  }, [ready])

  function toggle() {
    const player = playerRef.current
    if (!player) return

    if (playing) {
      player.pauseVideo()
      setPlaying(false)
    } else {
      player.playVideo()
      setPlaying(true)
    }
  }

  return (
    <>
      <div ref={containerRef} className="hidden" />
      <button
        onClick={toggle}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 shadow-lg backdrop-blur-sm ${
          playing
            ? "bg-gold text-cream border-gold shadow-gold/20"
            : "bg-cream/80 text-gold-dark border-gold/30 hover:bg-gold hover:text-cream hover:border-gold"
        } ${!loaded ? "opacity-50" : ""}`}
        aria-label={playing ? "Pausar" : "Tocar Trem Bala - Ana Vilela"}
        disabled={!loaded}
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
