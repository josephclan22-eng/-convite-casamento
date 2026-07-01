import { useState, useEffect, useRef } from "react"

const CHORDS = [
  [261.63, 329.63, 392.00, 493.88],
  [293.66, 349.23, 440.00, 523.25],
  [246.94, 311.13, 369.99, 440.00],
  [220.00, 277.18, 329.63, 392.00],
]

function createGainEnvelope(ctx: AudioContext, duration: number) {
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.5)
  gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + duration - 0.5)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration)
  return gain
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<{ stop: () => void } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  function play() {
    if (nodesRef.current) {
      nodesRef.current.stop()
      nodesRef.current = null
    }

    const ctx = new AudioContext()
    ctxRef.current = ctx
    const master = ctx.createGain()
    master.gain.value = 0.15
    master.connect(ctx.destination)

    const reverb = ctx.createConvolver()
    const reverbLen = 2
    const reverbBuf = ctx.createBuffer(2, ctx.sampleRate * reverbLen, ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const data = reverbBuf.getChannelData(ch)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.3))
      }
    }
    reverb.buffer = reverbBuf
    reverb.connect(master)

    const filter = ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.value = 800
    filter.connect(reverb)

    let chordIdx = 0
    let intervalId: ReturnType<typeof setInterval>

    function playChord() {
      const freqs = CHORDS[chordIdx % CHORDS.length]
      const duration = 3.2

      for (const freq of freqs) {
        const osc = ctx.createOscillator()
        osc.type = "sine"
        osc.frequency.value = freq

        const detune = (Math.random() - 0.5) * 2
        osc.detune.value = detune

        const gain = createGainEnvelope(ctx, duration)
        osc.connect(gain)
        gain.connect(filter)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + duration)
      }

      chordIdx++
    }

    playChord()
    intervalId = setInterval(playChord, 3400)

    nodesRef.current = {
      stop: () => {
        clearInterval(intervalId)
        ctx.close()
        ctxRef.current = null
        nodesRef.current = null
      },
    }
  }

  function stop() {
    if (nodesRef.current) {
      nodesRef.current.stop()
    }
  }

  function toggle() {
    if (playing) {
      stop()
      setPlaying(false)
    } else {
      play()
      setPlaying(true)
    }
  }

  if (!visible) return null

  return (
    <button
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 shadow-lg backdrop-blur-sm ${
        playing
          ? "bg-gold text-cream border-gold shadow-gold/20"
          : "bg-cream/80 text-gold-dark border-gold/30 hover:bg-gold hover:text-cream hover:border-gold"
      }`}
      aria-label={playing ? "Pausar música" : "Tocar música"}
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
