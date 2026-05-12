import { useState, useEffect } from 'react'
import { X, Stethoscope, User, Calendar, ClipboardList, CalendarPlus } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import { useEscFechar } from '../../hooks/useEscFechar'

const statusColors = {
  "Em Tratamento": "bg-blue-100 text-blue-700",
  Ativo:           "bg-green-100 text-green-700",
  Alta:            "bg-teal-100 text-teal-700",
  Arquivado:       "bg-gray-100 text-gray-500",
}

const statusBtnColors = {
  "Em Tratamento": "bg-blue-600 text-white border-blue-600",
  Ativo:           "bg-green-600 text-white border-green-600",
  Alta:            "bg-teal-600 text-white border-teal-600",
  Arquivado:       "bg-gray-500 text-white border-gray-500",
}

const statusOpcoes = ["Ativo", "Em Tratamento", "Alta", "Arquivado"]
const iniciais = (nome) => nome.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

export default function ModalDetalhesPaciente() {
  const { pacienteAtivo, setPacienteAtivo, setNovaConsultaAberto } = useModal()
  const [statusAtual, setStatusAtual] = useState(null)

  useEffect(() => {
    if (pacienteAtivo) setStatusAtual(pacienteAtivo.status)
  }, [pacienteAtivo])

  function handleClose() { setPacienteAtivo(null) }

  function abrirNovaConsulta() {
    setPacienteAtivo(null)
    setNovaConsultaAberto(true)
  }

  useEscFechar(handleClose, !!pacienteAtivo)

  if (!pacienteAtivo) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-[#005073] to-[#0099cc] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
              {iniciais(pacienteAtivo.nome)}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{pacienteAtivo.nome}</h2>
              <p className="text-blue-100 text-sm">{pacienteAtivo.idade} anos</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl hover:bg-white/20 transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
              <Stethoscope size={18} className="text-[#005073] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Diagnóstico</p>
                <p className="text-sm font-semibold text-gray-800">{pacienteAtivo.diagnostico}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
              <User size={18} className="text-[#005073] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Responsável</p>
                <p className="text-sm font-semibold text-gray-800">{pacienteAtivo.responsavel}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3 col-span-2">
              <Calendar size={18} className="text-[#005073] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Última Consulta</p>
                <p className="text-sm font-semibold text-gray-800">{pacienteAtivo.ultimaConsulta}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList size={16} className="text-gray-500" />
              <p className="text-sm font-semibold text-gray-700">Alterar Status</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {statusOpcoes.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusAtual(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    statusAtual === s ? statusBtnColors[s] : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-gray-100">
            <button
              onClick={abrirNovaConsulta}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#005073] to-[#0099cc] text-white text-sm font-medium hover:opacity-90 hover:scale-105 hover:shadow-md transition-all duration-200"
            >
              <CalendarPlus size={16} />
              Nova Consulta
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl bg-[#005073] text-white hover:bg-[#003f5c] transition-colors text-sm font-medium"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
