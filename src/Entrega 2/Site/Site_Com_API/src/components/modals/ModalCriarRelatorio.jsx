import { useState } from 'react'
import { X, FileText, FileSpreadsheet } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import { useEscFechar } from '../../hooks/useEscFechar'

const formInicial = {
  tipo: 'progresso',
  paciente: '',
  dataInicio: '',
  dataFim: '',
  observacoes: '',
  formato: 'pdf',
}

export default function ModalCriarRelatorio() {
  const { criarRelatorioAberto, setCriarRelatorioAberto } = useModal()
  const [form, setForm] = useState(formInicial)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleClose() {
    setCriarRelatorioAberto(false)
    setForm(formInicial)
  }

  useEscFechar(handleClose, criarRelatorioAberto)

  if (!criarRelatorioAberto) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Criar Relatório</h2>
            <p className="text-gray-500 text-sm mt-0.5">Gere um relatório clínico ou administrativo</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Tipo de Relatório</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073] bg-white"
            >
              <option value="progresso">Progresso do Paciente</option>
              <option value="atendimentos">Relatório de Atendimentos</option>
              <option value="financeiro">Relatório Financeiro</option>
              <option value="alta">Relatório de Alta</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Paciente</label>
            <input
              name="paciente"
              value={form.paciente}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]"
              placeholder="Nome do paciente (deixe vazio para todos)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Data Início</label>
              <input
                type="date"
                name="dataInicio"
                value={form.dataInicio}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Data Fim</label>
              <input
                type="date"
                name="dataFim"
                value={form.dataFim}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Observações</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows={2}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073] resize-none"
              placeholder="Informações adicionais para o relatório..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Formato de Exportação</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, formato: 'pdf' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.formato === 'pdf'
                    ? 'bg-[#005073] text-white border-[#005073]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileText size={16} />
                PDF
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, formato: 'excel' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.formato === 'excel'
                    ? 'bg-[#005073] text-white border-[#005073]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileSpreadsheet size={16} />
                Excel
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
          >
            Cancelar
          </button>
          <button className="px-6 py-2 rounded-xl bg-[#005073] text-white hover:bg-[#003f5c] transition-colors text-sm font-medium">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  )
}
