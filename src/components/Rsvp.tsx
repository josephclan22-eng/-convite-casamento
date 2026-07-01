import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { addGuest, downloadGuestList } from "./GuestListExcel"
import DecorativeDivider from "./DecorativeDivider"

export default function Rsvp() {
  const ref = useScrollReveal()
  const [submitted, setSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState<boolean | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    confirmed: null as boolean | null,
    companions: "0",
    companionNames: "",
    foodRestrictions: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || form.confirmed === null) return

    setLoading(true)

    setTimeout(() => {
      addGuest({
        name: form.name,
        email: form.email || "-",
        phone: form.phone || "-",
        confirmed: form.confirmed ? "Sim" : "Não",
        companions: form.confirmed ? Number(form.companions) : 0,
        companionNames: form.confirmed ? form.companionNames : "",
        foodRestrictions: form.confirmed ? form.foodRestrictions : "",
        message: form.message || "-",
      })

      setSubmitted(true)
      setConfirmed(form.confirmed)
      setLoading(false)
    }, 800)
  }

  const handleDownload = () => {
    downloadGuestList()
  }

  const reset = () => {
    setSubmitted(false)
    setConfirmed(null)
    setForm({
      name: "",
      email: "",
      phone: "",
      confirmed: null,
      companions: "0",
      companionNames: "",
      foodRestrictions: "",
      message: "",
    })
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-32 px-6" ref={ref}>
        <div className="scroll-reveal max-w-xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-gold/30 rounded-full">
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-ink mb-4">
            {confirmed ? "Presença Confirmada! \u{1F49B}" : "Registrado com carinho"}
          </h2>
          <p className="font-garamond text-ink-light text-lg italic mb-8 leading-relaxed">
            {confirmed
              ? "Sua presença já foi registrada. Mal podemos esperar para celebrar esse dia especial com você!"
              : "Compreendemos perfeitamente. Sentiremos sua falta, mas o carinho permanece!"}
          </p>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold/30 text-gold-dark font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-gold hover:text-cream hover:border-gold"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Baixar Planilha de Convidados
          </button>

          <div className="mt-12">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); reset() }}
              className="font-sans text-xs text-muted tracking-[0.1em] underline underline-offset-4 hover:text-gold-dark transition-colors"
            >
              Voltar e registrar outra pessoa
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="relative py-24 md:py-32 px-6" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-rose/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="scroll-reveal max-w-xl mx-auto text-center relative z-10">
        <DecorativeDivider variant="hearts" />

        <p className="font-garamond text-gold-dark text-xl italic mb-3">
          Sua presença é o nosso presente
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
          Confirme sua presença
        </h2>
        <p className="font-garamond text-ink-light text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Por favor, confirme até <strong className="text-gold-dark">15 de agosto de 2026</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left animate-fade-in-up">
          <div>
            <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
              Nome completo *
            </label>
            <input
              type="text"
              required
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-transparent border border-gold/20 text-ink placeholder:text-muted/40 font-garamond text-lg focus:outline-none focus:border-gold/60 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-transparent border border-gold/20 text-ink placeholder:text-muted/40 font-garamond text-lg focus:outline-none focus:border-gold/60 transition-all"
              />
            </div>
            <div>
              <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 bg-transparent border border-gold/20 text-ink placeholder:text-muted/40 font-garamond text-lg focus:outline-none focus:border-gold/60 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-3">
              Você vai comparecer? *
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setForm({ ...form, confirmed: true })}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 cursor-pointer transition-all duration-300 ${
                  form.confirmed === true
                    ? "bg-gold text-cream border-gold shadow-lg"
                    : "border-gold/30 text-muted hover:border-gold/60 hover:text-gold-dark"
                }`}
              >
                <span className="text-lg">👍</span>
                <span className="font-sans text-sm tracking-[0.2em] uppercase">Sim, estarei lá!</span>
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, confirmed: false })}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 cursor-pointer transition-all duration-300 ${
                  form.confirmed === false
                    ? "bg-ink/10 text-ink border-ink/30 shadow-lg"
                    : "border-gold/30 text-muted hover:border-gold/60 hover:text-gold-dark"
                }`}
              >
                <span className="text-lg">💔</span>
                <span className="font-sans text-sm tracking-[0.2em] uppercase">Não poderei ir</span>
              </button>
            </div>
          </div>

          {form.confirmed === true && (
            <>
              <div>
                <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
                  Acompanhantes
                </label>
                <select
                  value={form.companions}
                  onChange={(e) => setForm({ ...form, companions: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-gold/20 text-ink font-garamond text-lg focus:outline-none focus:border-gold/60 transition-all"
                >
                  <option value="0">Nenhum</option>
                  <option value="1">1 acompanhante</option>
                  <option value="2">2 acompanhantes</option>
                  <option value="3">3 acompanhantes</option>
                  <option value="4">4 acompanhantes</option>
                </select>
              </div>

              {Number(form.companions) > 0 && (
                <div>
                  <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
                    Nome dos acompanhantes
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Maria (convidada), João (convidado)"
                    value={form.companionNames}
                    onChange={(e) => setForm({ ...form, companionNames: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-gold/20 text-ink placeholder:text-muted/40 font-garamond text-lg focus:outline-none focus:border-gold/60 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
                  Restrições alimentares
                </label>
                <textarea
                  rows={2}
                  placeholder="Vegetariano, vegano, alergias, intolerâncias..."
                  value={form.foodRestrictions}
                  onChange={(e) => setForm({ ...form, foodRestrictions: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-gold/20 text-ink placeholder:text-muted/40 font-garamond text-lg focus:outline-none focus:border-gold/60 transition-all resize-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-sans text-[10px] text-muted tracking-[0.2em] uppercase mb-2">
              Mensagem para os noivos
            </label>
            <textarea
              rows={3}
              placeholder="Deixe uma mensagem especial..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-transparent border border-gold/20 text-ink placeholder:text-muted/40 font-garamond text-lg focus:outline-none focus:border-gold/60 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full py-4 overflow-hidden disabled:opacity-50"
          >
            <span className="absolute inset-0 border-2 border-gold transition-all duration-300 group-hover:bg-gold group-hover:border-gold" />
            <span className="relative z-10 font-sans text-sm tracking-[0.2em] uppercase text-gold-dark group-hover:text-cream transition-colors duration-300 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-ring" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="30 70" />
                  </svg>
                  Registrando...
                </>
              ) : form.confirmed === true ? (
                "Confirmar Presença"
              ) : form.confirmed === false ? (
                "Registrar Resposta"
              ) : (
                "Selecione se vai comparecer"
              )}
            </span>
          </button>
        </form>

        <DecorativeDivider variant="hearts" />
      </div>
    </section>
  )
}
