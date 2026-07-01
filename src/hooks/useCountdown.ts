import { useState, useEffect } from "react"

const WEDDING_DATE = new Date("2026-09-06T00:00:00")

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calc(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function useCountdown() {
  const [time, setTime] = useState<TimeLeft>(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}
