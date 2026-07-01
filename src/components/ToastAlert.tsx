import { useState, useEffect, useCallback } from "react"

const messages = [
  { text: "O amor não se vê com os olhos, mas com o coração.", author: "Antoine de Saint-Exupéry" },
  { text: "O amor é a asa que Deus deu à alma para voar até Ele.", author: "Miguel de Ângelo" },
  { text: "Amar não é olhar um para o outro, é olhar juntos na mesma direção.", author: "Antoine de Saint-Exupéry" },
  { text: "O amor é a poesia dos sentidos.", author: "Honoré de Balzac" },
  { text: "O verdadeiro amor não tem fim.", author: "Gabriel García Márquez" },
  { text: "O amor é composto de uma única alma habitando dois corpos.", author: "Aristóteles" },
  { text: "Nosso amor é a luz mais bonita que já existiu.", author: "Elivaldo & Sara" },
  { text: "O amor é a chave mestra que abre as portas da felicidade.", author: "Oliver Wendell Holmes" },
  { text: "Amar é encontrar na felicidade do outro a própria felicidade.", author: "Gottfried Leibniz" },
  { text: "O amor é a única coisa que cresce quando é compartilhada.", author: "Antoine de Saint-Exupéry" },
  { text: "Felizes os que amam e construíram juntos uma história.", author: "Elivaldo & Sara" },
]

type ToastType = "message" | "guest" | "countdown"

interface ToastData {
  type: ToastType
  icon?: string
  text?: string
  author?: string
  body?: string
}

export default function ToastAlert() {
  const [current, setCurrent] = useState<ToastData | null>(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const show = useCallback((data: ToastData) => {
    if (dismissed) return
    setCurrent(data)
    setVisible(true)
    setTimeout(() => setVisible(false), 7000)
  }, [dismissed])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        show({
          type: "guest",
          icon: "💛",
          text: "Lembrete especial",
          body: "Não se esqueça de confirmar sua presença! Os noivos estão ansiosos.",
        })
      } else {
        const idx = Math.floor(Math.random() * messages.length)
        show({ type: "message", text: messages[idx].text, author: messages[idx].author })
      }
    }, 28000 + Math.random() * 12000)

    const first = setTimeout(() => {
      show({
        type: "countdown",
        icon: "⏳",
        text: "Contagem regressiva",
        body: "Faltam poucos meses para o grande dia! A emoção toma conta.",
      })
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(first)
    }
  }, [show])

  if (!visible || !current) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-fade-in-up">
      <div className="relative bg-ink/90 backdrop-blur-md border border-gold/15 p-5 shadow-2xl">
        <button
          onClick={() => {
            setVisible(false)
            setDismissed(true)
          }}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-muted hover:text-cream transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {current.type === "message" ? (
          <div className="flex gap-3 pr-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <div>
              <p className="font-garamond text-cream/90 text-base italic leading-relaxed">
                "{current.text}"
              </p>
              <p className="font-sans text-[10px] text-gold/50 tracking-[0.1em] mt-2">
                — {current.author}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 pr-4">
            <span className="text-xl">{current.icon}</span>
            <div>
              <p className="font-sans text-[10px] text-gold/60 tracking-[0.15em] uppercase mb-1">
                {current.text}
              </p>
              <p className="font-garamond text-cream/80 text-base italic">
                {current.body}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
