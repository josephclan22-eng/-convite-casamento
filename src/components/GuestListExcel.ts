import * as XLSX from "xlsx"

interface Guest {
  name: string
  email: string
  phone: string
  confirmed: "Sim" | "Não"
  companions: number
  companionNames: string
  foodRestrictions: string
  message: string
  timestamp: string
}

const guests: Guest[] = []

export function addGuest(guest: Omit<Guest, "timestamp">) {
  guests.push({ ...guest, timestamp: new Date().toLocaleString("pt-BR") })
}

export function downloadGuestList() {
  if (guests.length === 0) return false

  const data = guests.map((g, i) => ({
    "#": i + 1,
    Nome: g.name,
    Email: g.email,
    Telefone: g.phone || "-",
    Confirmou: g.confirmed,
    Acompanhantes: g.confirmed === "Sim" ? g.companions : 0,
    "Nomes dos Acompanhantes": g.companionNames || "-",
    "Restrições Alimentares": g.foodRestrictions || "-",
    "Total de Pessoas": g.confirmed === "Sim" ? g.companions + 1 : 0,
    Mensagem: g.message || "-",
    "Data/Hora": g.timestamp,
  }))

  const summary = [
    {},
    { Nome: "RESUMO" },
    {
      Nome: "Total de Confirmados",
      Email: String(data.filter((d) => d.Confirmou === "Sim").length),
      "Total de Pessoas": String(data.filter((d) => d.Confirmou === "Sim").reduce((a, d) => a + d["Total de Pessoas"], 0)),
    },
    {
      Nome: "Total de Não Confirmados",
      Email: String(data.filter((d) => d.Confirmou === "Não").length),
      "Total de Pessoas": "0",
    },
  ]

  const ws = XLSX.utils.json_to_sheet([...data, ...summary])

  const colWidths = [
    { wch: 4 }, { wch: 30 }, { wch: 30 }, { wch: 18 }, { wch: 12 },
    { wch: 14 }, { wch: 36 }, { wch: 28 }, { wch: 18 }, { wch: 40 }, { wch: 20 },
  ]
  ws["!cols"] = colWidths

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Convidados")

  XLSX.writeFile(wb, `Lista-Convidados-Elivaldo&Sara-${new Date().toISOString().split("T")[0]}.xlsx`)

  guests.length = 0
  return true
}

export function getGuestCount() {
  return guests.length
}
