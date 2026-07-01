import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
  type: "heart" | "ring" | "petal" | "diamond" | "clarinet" | "piano" | "treble" | "bass"
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.scale(size / 15, size / 15)
  ctx.beginPath()
  ctx.moveTo(0, -5)
  ctx.bezierCurveTo(-10, -15, -20, 0, 0, 10)
  ctx.bezierCurveTo(20, 0, 10, -15, 0, -5)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawRing(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.beginPath()
  ctx.ellipse(0, 0, size / 2, size / 3, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

function drawPetal(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.beginPath()
  ctx.ellipse(0, -size / 2, size / 4, size / 2, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.beginPath()
  ctx.moveTo(0, -size / 2)
  ctx.lineTo(size / 2, 0)
  ctx.lineTo(0, size / 2)
  ctx.lineTo(-size / 2, 0)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

function drawClarinet(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  const s = size / 28
  ctx.scale(s, s)
  ctx.lineWidth = 1.5
  const col = "rgba(201, 168, 76, 0.75)"

  // Body tube
  ctx.strokeStyle = col
  ctx.fillStyle = "rgba(201, 168, 76, 0.3)"
  ctx.beginPath()
  ctx.moveTo(-2, -14)
  ctx.quadraticCurveTo(-3, -7, -2.5, 6)
  ctx.lineTo(2.5, 6)
  ctx.quadraticCurveTo(3, -7, 2, -14)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Bell (flared end)
  ctx.beginPath()
  ctx.moveTo(-2.5, 6)
  ctx.quadraticCurveTo(-5, 8, -7, 14)
  ctx.lineTo(7, 14)
  ctx.quadraticCurveTo(5, 8, 2.5, 6)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Mouthpiece
  ctx.beginPath()
  ctx.moveTo(-1.5, -14)
  ctx.lineTo(1.5, -14)
  ctx.lineTo(2, -18)
  ctx.lineTo(-0.5, -18)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Keys
  ctx.fillStyle = "rgba(201, 168, 76, 0.6)"
  for (let i = -10; i <= 2; i += 4) {
    ctx.beginPath()
    ctx.arc(3.5, i, 1, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }

  ctx.restore()
}

function drawPiano(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  const s = size / 24
  ctx.scale(s, s)

  ctx.fillStyle = "rgba(201, 168, 76, 0.25)"
  ctx.strokeStyle = "rgba(201, 168, 76, 0.65)"
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.roundRect(-12, -8, 24, 16, 2)
  ctx.fill()
  ctx.stroke()

  const keyW = 24 / 14
  ctx.fillStyle = "rgba(248, 245, 240, 0.4)"
  for (let k = 0; k < 14; k++) {
    const kx = -12 + k * keyW
    ctx.fillRect(kx, -6, keyW - 0.3, 10)
    ctx.strokeRect(kx, -6, keyW - 0.3, 10)
  }

  ctx.fillStyle = "rgba(30, 30, 46, 0.4)"
  const blackKeys = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12]
  for (const bk of blackKeys) {
    const kx = -12 + (bk + 1) * keyW - keyW * 0.35
    ctx.fillRect(kx, -6, keyW * 0.6, 6)
  }

  ctx.restore()
}

function drawTrebleClef(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  const s = size / 18
  ctx.scale(s, s)
  ctx.strokeStyle = "rgba(201, 168, 76, 0.7)"
  ctx.lineWidth = 1.5
  ctx.fillStyle = "rgba(201, 168, 76, 0.3)"

  // Simplified treble clef using bezier curves
  ctx.beginPath()
  // Bottom loop
  ctx.moveTo(0, 12)
  ctx.bezierCurveTo(-5, 12, -7, 8, -4, 5)
  ctx.bezierCurveTo(-1, 2, 3, 3, 4, 6)
  ctx.bezierCurveTo(6, 10, 2, 12, 0, 12)
  ctx.fill()
  ctx.stroke()

  // Top spiral
  ctx.beginPath()
  ctx.moveTo(0, 12)
  ctx.bezierCurveTo(1, 9, 5, 7, 6, 4)
  ctx.bezierCurveTo(7, 0, 5, -4, 2, -5)
  ctx.bezierCurveTo(-2, -6, -5, -3, -4, 1)
  ctx.bezierCurveTo(-3, 3, 0, 4, 2, 2)
  ctx.stroke()

  // Vertical line through the clef
  ctx.beginPath()
  ctx.moveTo(2, -6)
  ctx.lineTo(2, -14)
  ctx.stroke()

  // Small dot at bottom
  ctx.beginPath()
  ctx.arc(0, 14, 1, 0, Math.PI * 2)
  ctx.fillStyle = "rgba(201, 168, 76, 0.7)"
  ctx.fill()

  ctx.restore()
}

function drawBassClef(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  const s = size / 16
  ctx.scale(s, s)
  ctx.strokeStyle = "rgba(201, 168, 76, 0.7)"
  ctx.lineWidth = 1.5
  ctx.fillStyle = "rgba(201, 168, 76, 0.3)"

  // Main curved body
  ctx.beginPath()
  ctx.moveTo(4, -6)
  ctx.bezierCurveTo(0, -6, -4, -2, -5, 3)
  ctx.bezierCurveTo(-6, 9, -2, 13, 3, 13)
  ctx.bezierCurveTo(7, 13, 9, 9, 7, 5)
  ctx.bezierCurveTo(5, 1, 1, 0, 0, 3)
  ctx.stroke()

  // Fill body
  ctx.beginPath()
  ctx.moveTo(4, -6)
  ctx.bezierCurveTo(0, -6, -4, -2, -5, 3)
  ctx.bezierCurveTo(-6, 9, -2, 13, 3, 13)
  ctx.bezierCurveTo(7, 13, 9, 9, 7, 5)
  ctx.bezierCurveTo(5, 1, 1, 0, 0, 3)
  ctx.lineTo(1, -2)
  ctx.bezierCurveTo(3, -4, 5, -5, 4, -6)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Two dots
  ctx.beginPath()
  ctx.arc(-8, 0, 1.2, 0, Math.PI * 2)
  ctx.fillStyle = "rgba(201, 168, 76, 0.7)"
  ctx.fill()

  ctx.beginPath()
  ctx.arc(-8, 7, 1.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function initParticles(canvasW: number, canvasH: number, count: number): Particle[] {
  const types: Particle["type"][] = ["heart", "ring", "petal", "diamond", "clarinet", "piano", "treble", "bass"]
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    size: 6 + Math.random() * 16,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: -0.2 - Math.random() * 0.6,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    opacity: 0.2 + Math.random() * 0.35,
    type: types[i % 8],
  }))
}

export default function FloatingParticles({ count = 32 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current!
    if (!canvasEl) return

    const ctx = canvasEl.getContext("2d")!
    if (!ctx) return

    const resize = () => {
      canvasEl.width = window.innerWidth
      canvasEl.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles = initParticles(canvasEl.width, canvasEl.height, count)
    let animId: number

    function animate() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        if (p.y + p.size < 0) {
          p.y = canvasEl.height + p.size
          p.x = Math.random() * canvasEl.width
        }
        if (p.x < -p.size) p.x = canvasEl.width + p.size
        if (p.x > canvasEl.width + p.size) p.x = -p.size

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.strokeStyle = "rgba(201, 168, 76, 0.6)"
        ctx.fillStyle = "rgba(201, 168, 76, 0.45)"
        ctx.lineWidth = 1.5

        if (p.type === "heart") {
          ctx.fillStyle = "rgba(201, 168, 76, 0.45)"
          drawHeart(ctx, p.x, p.y, p.size, p.rotation)
        } else if (p.type === "ring") {
          drawRing(ctx, p.x, p.y, p.size, p.rotation)
        } else if (p.type === "diamond") {
          drawDiamond(ctx, p.x, p.y, p.size, p.rotation)
        } else if (p.type === "clarinet") {
          drawClarinet(ctx, p.x, p.y, p.size, p.rotation)
        } else if (p.type === "piano") {
          drawPiano(ctx, p.x, p.y, p.size, p.rotation)
        } else if (p.type === "treble") {
          drawTrebleClef(ctx, p.x, p.y, p.size, p.rotation)
        } else if (p.type === "bass") {
          drawBassClef(ctx, p.x, p.y, p.size, p.rotation)
        } else {
          ctx.fillStyle = "rgba(242, 213, 213, 0.55)"
          drawPetal(ctx, p.x, p.y, p.size, p.rotation)
        }

        ctx.restore()
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
