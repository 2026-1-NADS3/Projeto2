import { X, ArchiveRestore } from 'lucide-react'
import { useModal } from '../../context/ModalContext'
import { useEscFechar } from '../../hooks/useEscFechar'

const pacientesArquivados = [
  {
    id: 1,
    nome: "Roberto Lima",
    idade: 63,
    diagnostico: "Artrose no Quadril",
    responsavel: "Enzo Ribeiro",
    ultimaConsulta: "15 Set 2024",
  },
  {
    id: 2,
    nome: "Fernanda Castelo",
    idade: 51,
    diagnostico: "Tendinite Rotuliana",
    responsavel: "Dra. Maya Yamamoto",
    ultimaConsulta: "02 Ago 2024",
  },
  {
    id: 3,
    nome: "Carlos Pereira",
    idade: 44,
    diagnostico: "Síndrome do Túnel do Carpo",
    responsavel: "Enzo Ribeiro",
    ultimaConsulta: "18 Jul 2024",
  },
  {
    id: 4,
    nome: "Luciana Ferraz",
    idade: 37,
    diagnostico: "Escoliose Leve",
    responsavel: "Dra. Maya Yamamoto",
    ultimaConsulta: "10 Jun 2024",
  },
]

export default function ModalArquivados() {
  const { arquivadosAberto, setArquivadosAberto } = useModal()

  function handleClose() { setArquivadosAberto(false) }

  useEscFechar(handleClose, arquivadosAberto)

  if (!arquivadosAberto) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Pacientes Arquivados</h2>
            <p className="text-gray-500 text-sm mt-0.5">{pacientesArquivados.length} pacientes arquivados</p>
          </div>
          <button onClick={() => setArquivadosAberto(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
          {pacientesArquivados.map((p) => {
            const iniciais = p.nome.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
            return (
              <div
                key={p.id}
                className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {iniciais}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-700 text-sm">{p.nome}</h3>
                    <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Arquivado</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {p.idade} anos · {p.diagnostico}
                  </p>
                </div>

                {/* Responsável */}
                <div className="text-right hidden sm:block flex-shrink-0">
                  <p className="text-xs text-gray-400">Última consulta</p>
                  <p className="text-xs font-medium text-gray-600">{p.ultimaConsulta}</p>
                </div>

                {/* Botão reativar */}
                <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border border-gray-200 text-[#005073] hover:bg-[#005073] hover:text-white hover:border-[#005073] transition-all flex-shrink-0">
                  <ArchiveRestore size={13} />
                  Reativar
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setArquivadosAberto(false)}
            className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
