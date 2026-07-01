import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLElement | string, opts: Record<string, any>) => any
      PlayerState: { PLAYING: number; PAUSED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

const YOUTUBE_ID = "SOJZdsXC47g"

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let player: any = null

    function initPlayer() {
      const el = containerRef.current
      const YT = window.YT
      if (!el || !YT) return
      player = new YT.Player(el, {
        height: "0",
        width: "0",
        videoId: YOUTUBE_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: YOUTUBE_ID,
        },
        events: {
          onReady: () => {
            playerRef.current = player
            if (player.setVolume) player.setVolume(40)
            setPlaying(true)
          },
          onStateChange: (e: any) => {
            const YT2 = window.YT
            if (!YT2) return
            if (e.data === YT2.PlayerState.PLAYING) setPlaying(true)
            if (e.data === YT2.PlayerState.PAUSED) setPlaying(false)
          },
          onError: () => setPlaying(false),
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.head.appendChild(tag)
    }

    return () => {
      if (player?.destroy) player.destroy()
    }
  }, [])

  function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const p = playerRef.current
    if (!p) return
    if (playing) p.pauseVideo()
    else p.playVideo()
  }

  return (
    <>
      <div ref={containerRef} style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} />
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
