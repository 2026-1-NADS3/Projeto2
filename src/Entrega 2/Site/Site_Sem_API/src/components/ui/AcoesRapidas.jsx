import { UserRoundPlus, Newspaper, CalendarPlus, Archive } from 'lucide-react'
import { useModal } from '../../context/ModalContext'

const acoes = [
  { label: "Novo Paciente",  icon: UserRoundPlus, action: "novoPaciente",    cor: "text-violet-600", fundo: "bg-violet-50 hover:bg-violet-600" },
  { label: "Nova Consulta",  icon: CalendarPlus,  action: "novaConsulta",    cor: "text-sky-600",    fundo: "bg-sky-50 hover:bg-sky-600" },
  { label: "Criar Relatório",icon: Newspaper,     action: "criarRelatorio",  cor: "text-teal-600",   fundo: "bg-teal-50 hover:bg-teal-600" },
  { label: "Arquivados",     icon: Archive,       action: "arquivados",      cor: "text-amber-600",  fundo: "bg-amber-50 hover:bg-amber-600" },
]

export default function Acoes() {
  const { setNovoPacienteAberto, setNovaConsultaAberto, setCriarRelatorioAberto, setArquivadosAberto } = useModal()

  function handleClick(action) {
    if (action === "novoPaciente")   setNovoPacienteAberto(true)
    if (action === "novaConsulta")   setNovaConsultaAberto(true)
    if (action === "criarRelatorio") setCriarRelatorioAberto(true)
    if (action === "arquivados")     setArquivadosAberto(true)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="font-bold text-gray-700 mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {acoes.map((acao) => (
          <button
            key={acao.label}
            onClick={() => handleClick(acao.action)}
            className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 ${acao.fundo} hover:text-white hover:border-transparent transition-all duration-200`}
          >
            <acao.icon size={22} className={`${acao.cor} group-hover:text-white transition-colors`} />
            <span className={`text-xs font-semibold text-center leading-tight ${acao.cor} group-hover:text-white transition-colors`}>
              {acao.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
