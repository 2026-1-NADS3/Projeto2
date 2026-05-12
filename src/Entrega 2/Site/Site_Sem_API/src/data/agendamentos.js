function criarHorario(hora) {
  const d = new Date()
  d.setHours(hora, 0, 0, 0)
  return d.toISOString()
}

export const dadosAgendamentos = [
  { id: 1, dataHora: criarHorario(8),  nomePaciente: "Beatriz Helena Santos", tipo: "RPG",             foco: "Coluna lombar",        status: "Realizado"  },
  { id: 2, dataHora: criarHorario(9),  nomePaciente: "Marcus Thompson",       tipo: "Fisioterapia",    foco: "Joelho pós-cirúrgico", status: "Confirmado" },
  { id: 3, dataHora: criarHorario(10), nomePaciente: "Ana Silveira",          tipo: "RPG",             foco: "Lombalgia crônica",    status: "Aguardando" },
  { id: 4, dataHora: criarHorario(11), nomePaciente: "Gabriel Mendes",        tipo: "Pilates Clínico", foco: "Fortalecimento",       status: "Confirmado" },
  { id: 5, dataHora: criarHorario(14), nomePaciente: "Sofia Carvalho",        tipo: "Acupuntura",      foco: "Cervicalgia",          status: "Confirmado" },
]
