import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dadosAgendamentos } from '../../data/agendamentos'

const statusColors = {
  Confirmado: "bg-green-100 text-green-700",
  Cancelado:  "bg-red-100 text-red-600",
  Aguardando: "bg-yellow-100 text-yellow-700",
  Realizado:  "bg-blue-100 text-blue-700",
}

function normalizarStatus(status) {
  const mapa = {
    CONFIRMADO: 'Confirmado', confirmado: 'Confirmado',
    CANCELADO:  'Cancelado',  cancelado:  'Cancelado',
    AGUARDANDO: 'Aguardando', aguardando: 'Aguardando',
    PENDENTE:   'Aguardando', pendente:   'Aguardando',
    REALIZADO:  'Realizado',  realizado:  'Realizado',
  }
  return mapa[status] ?? status
}

function ehHoje(valor) {
  const d = new Date(valor)
  const n = new Date()
  return d.getDate() === n.getDate() &&
    d.getMonth() === n.getMonth() &&
    d.getFullYear() === n.getFullYear()
}

function formatarHora(valor) {
  const d = new Date(valor)
  return isNaN(d) ? valor : d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

const consultasHoje = dadosAgendamentos
  .filter(a => ehHoje(a.dataHora ?? a.data ?? a.horario))
  .slice(0, 5)

export default function Consultas() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-gray-800 text-lg">Próximas Consultas</h2>
          <p className="text-xs text-gray-400 mt-0.5">Agenda de hoje</p>
        </div>
        <Link
          to="/agenda"
          className="flex items-center gap-1 text-sm text-[#005073] font-medium hover:underline"
        >
          Ver Agenda <MoveRight size={14} />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {consultasHoje.length === 0 && (
          <p className="text-sm text-gray-400 py-4 text-center">Nenhuma consulta hoje.</p>
        )}
        {consultasHoje.map((c) => {
          const nomePaciente = c.paciente?.nome ?? c.nomePaciente ?? c.nome ?? '—'
          const tipo         = c.servico?.nome  ?? c.tipo         ?? c.tipoServico ?? '—'
          const status       = normalizarStatus(c.status)
          const horario      = formatarHora(c.dataHora ?? c.data ?? c.horario ?? '')
          const iniciais     = nomePaciente.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

          return (
            <div
              key={c.id}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-14 text-center flex-shrink-0">
                <p className="text-base font-bold text-gray-800">{horario}</p>
              </div>

              <div className="w-px h-10 bg-gray-100 flex-shrink-0" />

              <div className="w-10 h-10 rounded-full bg-[#005073] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {iniciais}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{nomePaciente}</p>
                <p className="text-xs text-gray-400">{tipo}</p>
              </div>

              <span className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ${statusColors[status] ?? 'bg-gray-100 text-gray-600'}`}>
                {status}
              </span>

              <button className="text-xs px-3 py-2 rounded-xl border border-gray-200 text-[#005073] opacity-0 group-hover:opacity-100 hover:bg-[#005073] hover:text-white transition-all flex-shrink-0">
                Detalhes
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
