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
  type: "heart" | "ring" | "petal"
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

function initParticles(canvasW: number, canvasH: number, count: number): Particle[] {
  const types: Particle["type"][] = ["heart", "ring", "petal"]
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    size: 8 + Math.random() * 16,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: -0.2 - Math.random() * 0.6,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    opacity: 0.35 + Math.random() * 0.4,
    type: types[i % 3],
  }))
}

export default function FloatingParticles({ count = 18 }: { count?: number }) {
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
        ctx.strokeStyle = "rgba(201, 168, 76, 0.8)"
        ctx.fillStyle = "rgba(201, 168, 76, 0.6)"
        ctx.lineWidth = 2

        if (p.type === "heart") {
          ctx.fillStyle = "rgba(201, 168, 76, 0.55)"
          drawHeart(ctx, p.x, p.y, p.size, p.rotation)
        } else if (p.type === "ring") {
          drawRing(ctx, p.x, p.y, p.size, p.rotation)
        } else {
          ctx.fillStyle = "rgba(242, 213, 213, 0.7)"
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
