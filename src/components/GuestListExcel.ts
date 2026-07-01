import { supabase } from "../lib/supabase"

export interface Guest {
  name: string
  email: string
  phone: string
  confirmed: "Sim" | "Não"
  companions: number
  companionNames: string
  foodRestrictions: string
  message: string
}

interface GuestRow extends Guest {
  id?: number
  created_at?: string
}

const localGuests: GuestRow[] = []

export async function addGuest(guest: Guest) {
  if (supabase) {
    const { error } = await supabase.from("guests").insert({
      name: guest.name,
      email: guest.email || "-",
      phone: guest.phone || "-",
      confirmed: guest.confirmed,
      companions: guest.companions,
      companion_names: guest.companionNames || "",
      food_restrictions: guest.foodRestrictions || "",
      message: guest.message || "-",
    }, { returning: "minimal" })
    if (error) {
      console.error("Supabase insert error:", error)
      localGuests.push({ ...guest, created_at: new Date().toISOString() })
    }
  } else {
    localGuests.push({ ...guest, created_at: new Date().toISOString() })
  }
}

export async function downloadGuestList() {
  let data: GuestRow[]

  if (supabase) {
    const { data: rows, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Supabase fetch error:", error)
      data = [...localGuests]
    } else {
      data = rows || []
    }
  } else {
    data = [...localGuests]
  }

  if (data.length === 0) return false

  const { default: XLSX } = await import("xlsx")

  const rows = data.map((g, i) => ({
    "#": i + 1,
    Nome: g.name,
    Email: g.email,
    Telefone: g.phone,
    Confirmou: g.confirmed,
    Acompanhantes: g.confirmed === "Sim" ? g.companions : 0,
    "Nomes dos Acompanhantes": g.companionNames || "-",
    "Restrições Alimentares": g.foodRestrictions || "-",
    "Total de Pessoas": g.confirmed === "Sim" ? g.companions + 1 : 0,
    Mensagem: g.message || "-",
    "Data/Hora": g.created_at
      ? new Date(g.created_at).toLocaleString("pt-BR")
      : "-",
  }))

  const summary = [
    {},
    { Nome: "RESUMO" },
    {
      Nome: "Total de Confirmados",
      Email: String(rows.filter((r) => r.Confirmou === "Sim").length),
      "Total de Pessoas": String(
        rows.filter((r) => r.Confirmou === "Sim").reduce((a, r) => a + r["Total de Pessoas"], 0)
      ),
    },
    {
      Nome: "Total de Não Confirmados",
      Email: String(rows.filter((r) => r.Confirmou === "Não").length),
      "Total de Pessoas": "0",
    },
  ]

  const ws = XLSX.utils.json_to_sheet([...rows, ...summary])

  ws["!cols"] = [
    { wch: 4 }, { wch: 30 }, { wch: 30 }, { wch: 18 }, { wch: 12 },
    { wch: 14 }, { wch: 36 }, { wch: 28 }, { wch: 18 }, { wch: 40 }, { wch: 20 },
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Convidados")
  XLSX.writeFile(wb, `Lista-Convidados-Elivaldo&Sara-${new Date().toISOString().split("T")[0]}.xlsx`)

  return true
}

export async function getGuestCount() {
  if (supabase) {
    const { count } = await supabase
      .from("guests")
      .select("*", { count: "exact", head: true })
    return count ?? localGuests.length
  }
  return localGuests.length
}
