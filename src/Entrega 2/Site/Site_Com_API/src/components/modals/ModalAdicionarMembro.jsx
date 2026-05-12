import { useState } from 'react'
import { X } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import { useEscFechar } from '../../hooks/useEscFechar'

const formInicial = {
  nome: '',
  especialidade: '',
  cargo: 'fisioterapeuta',
  registro: '',
  telefone: '',
}

export default function ModalAdicionarMembro() {
  const { adicionarMembroAberto, setAdicionarMembroAberto } = useModal()
  const [form, setForm] = useState(formInicial)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleClose() {
    setAdicionarMembroAberto(false)
    setForm(formInicial)
  }

  useEscFechar(handleClose, adicionarMembroAberto)

  if (!adicionarMembroAberto) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Adicionar Membro</h2>
            <p className="text-gray-500 text-sm mt-0.5">Cadastre um novo profissional na equipe</p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Nome Completo</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]"
              placeholder="Nome completo do profissional"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Especialidade</label>
            <input
              name="especialidade"
              value={form.especialidade}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]"
              placeholder="Ex: Fisioterapeuta Sênior"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Cargo / Nível de Acesso</label>
              <select
                name="cargo"
                value={form.cargo}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073] bg-white"
              >
                <option value="admin">Admin</option>
                <option value="fisioterapeuta">Fisioterapeuta</option>
                <option value="recepcao">Recepção</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Registro Profissional</label>
              <input
                name="registro"
                value={form.registro}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]"
                placeholder="Ex: CREFITO 123.456"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Telefone</label>
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#005073]"
              placeholder="(00) 00000-0000"
            />
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
            Adicionar Membro
          </button>
        </div>
      </div>
    </div>
  )
}
