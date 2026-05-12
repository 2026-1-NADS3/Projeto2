import { useState } from 'react'
import { X } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import { useEscFechar } from '../../hooks/useEscFechar'

const formInicial = {
  paciente: '',
  profissional: '',
  data: '',
  horario: '',
  tipo: '',
  observacoes: '',
  duracao: '',
  status: 'Confirmado',
}

export default function ModalNovaConsulta() {
  const { novaConsultaAberto, setNovaConsultaAberto } = useModal()
  const [form, setForm] = useState(formInicial)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleClose() {
    setNovaConsultaAberto(false)
    setForm(formInicial)
  }

  useEscFechar(handleClose, novaConsultaAberto)

  if (!novaConsultaAberto) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Nova Consulta</h2>
            <p className="text-gray-500 text-sm">Preencha os dados da sessão</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Paciente</label>
            <input name="paciente" value={form.paciente} onChange={handleChange} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]" placeholder="Nome do paciente" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Profissional</label>
            <input name="profissional" value={form.profissional} onChange={handleChange} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]" placeholder="Profissional responsável" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Data</label>
            <input type="date" name="data" value={form.data} onChange={handleChange} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Horário</label>
            <input type="time" name="horario" value={form.horario} onChange={handleChange} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Tipo de Atendimento</label>
            <input name="tipo" value={form.tipo} onChange={handleChange} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]" placeholder="Ex: RPG, Pós-Op..." />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Duração</label>
            <input name="duracao" value={form.duracao} onChange={handleChange} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]" placeholder="Ex: 60 min" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm font-medium text-gray-600">Observações Clínicas</label>
            <textarea name="observacoes" value={form.observacoes} onChange={handleChange} rows={3} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073] resize-none" placeholder="Notas e observações..." />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Status Inicial</label>
            <select name="status" value={form.status} onChange={handleChange} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]">
              <option>Confirmado</option>
              <option>Aguardando</option>
              <option>Cancelado</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleClose} className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm">
            Cancelar
          </button>
          <button className="px-6 py-2 rounded-xl bg-[#005073] text-white hover:bg-[#003f5c] transition-colors text-sm font-medium">
            Salvar Consulta
          </button>
        </div>
      </div>
    </div>
  )
}
