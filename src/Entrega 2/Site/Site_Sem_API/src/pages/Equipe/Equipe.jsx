import { useState } from "react";
import CardMembros from "../../components/ui/CardEquipe";
import { Plus, Users, CalendarCheck, ShieldCheck, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useModal } from "../../context/ModalContext";

const membros = [
  {
    nome: "Maya Yamamoto",
    especialidade: "Diretora Clínica",
    cargo: "admin",
    pacientes: 14,
    registro: "CRFa 12.345",
  },
  {
    nome: "Enzo Ribeiro",
    especialidade: "Fisioterapeuta Sênior",
    cargo: "fisioterapeuta",
    pacientes: 7,
    registro: "CREFITO 654.321",
  },
  {
    nome: "Rikelmy Nacleto",
    especialidade: "Assistente Administrativo",
    cargo: "recepcao",
    pacientes: null,
    registro: null,
  },
  {
    nome: "Bianca Souza",
    especialidade: "Recepcionista",
    cargo: "recepcao",
    pacientes: null,
    registro: null,
  },
];

const niveisAcesso = [
  {
    titulo: "Admin",
    descricao: "Controle total da clínica",
    badgeCor: "bg-violet-100 text-violet-700",
    permissoes: [
      { texto: "Acesso total ao sistema", ok: true },
      { texto: "Gerenciar equipe", ok: true },
      { texto: "Relatórios financeiros", ok: true },
      { texto: "Configurações da clínica", ok: true },
    ],
  },
  {
    titulo: "Fisioterapeuta",
    descricao: "Gestão de pacientes e sessões",
    badgeCor: "bg-sky-100 text-sky-700",
    permissoes: [
      { texto: "Ver e editar seus pacientes", ok: true },
      { texto: "Criar planos de tratamento", ok: true },
      { texto: "Acessar prontuários", ok: true },
      { texto: "Dados financeiros", ok: false },
    ],
  },
  {
    titulo: "Recepção",
    descricao: "Agendamentos e atendimento",
    badgeCor: "bg-teal-100 text-teal-700",
    permissoes: [
      { texto: "Agendar consultas", ok: true },
      { texto: "Ver agenda da equipe", ok: true },
      { texto: "Acessar prontuários", ok: false },
      { texto: "Dados financeiros", ok: false },
    ],
  },
];

const POR_VEZ = 3;

export default function Equipe() {
  const [indice, setIndice] = useState(0);
  const { setAdicionarMembroAberto } = useModal();

  const totalPacientes = membros.reduce((acc, m) => acc + (m.pacientes ?? 0), 0);
  const admins = membros.filter((m) => m.cargo === "admin").length;

  const podeAnterior = indice > 0;
  const podePosterior = indice + POR_VEZ < membros.length;

  return (
    <div className="min-h-full bg-gray-50">
      {/* Banner topo */}
      <div className="bg-gradient-to-r from-[#005073] to-[#0099cc] px-8 py-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-1">Instituto Maya</p>
            <h1 className="text-3xl font-bold text-white">Nossa Equipe</h1>
            <p className="text-blue-100 text-sm mt-1">
              Profissionais dedicados ao cuidado e reabilitação dos pacientes
            </p>
          </div>
          <button
            onClick={() => setAdicionarMembroAberto(true)}
            className="flex items-center gap-2 bg-white text-[#005073] px-4 py-2.5 rounded-xl font-medium hover:bg-blue-50 transition-colors shadow-md"
          >
            <Plus size={18} />
            Adicionar Membro
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-xs">Membros da Equipe</p>
              <p className="text-white text-2xl font-bold">{membros.length}</p>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <CalendarCheck size={20} className="text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-xs">Pacientes Ativos</p>
              <p className="text-white text-2xl font-bold">{totalPacientes}</p>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-xs">Administradores</p>
              <p className="text-white text-2xl font-bold">{admins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="px-8 py-8 flex flex-col gap-8">

        {/* Carrossel de Profissionais */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-700">Profissionais</h2>
              <p className="text-sm text-gray-400">{membros.length} membros cadastrados</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIndice(indice - 1)}
                disabled={!podeAnterior}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#005073] hover:text-white hover:border-[#005073] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-400 min-w-[60px] text-center">
                {indice + 1}–{Math.min(indice + POR_VEZ, membros.length)} de {membros.length}
              </span>
              <button
                onClick={() => setIndice(indice + 1)}
                disabled={!podePosterior}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#005073] hover:text-white hover:border-[#005073] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {membros.slice(indice, indice + POR_VEZ).map((m) => (
              <CardMembros
                key={m.nome}
                nome={m.nome}
                especialidade={m.especialidade}
                cargo={m.cargo}
                pacientes={m.pacientes}
                registro={m.registro}
              />
            ))}
          </div>

          {/* Dots de navegação */}
          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: membros.length - POR_VEZ + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setIndice(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === indice ? "bg-[#005073] w-6" : "bg-gray-200 w-2 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Níveis de Acesso */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-700">Níveis de Acesso</h2>
            <p className="text-sm text-gray-400 mt-0.5">Permissões por perfil de usuário</p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {niveisAcesso.map((nivel) => (
              <div key={nivel.titulo} className="bg-white rounded-3xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${nivel.badgeCor}`}>
                    {nivel.titulo}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">{nivel.descricao}</p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {nivel.permissoes.map((p) => (
                    <li key={p.texto} className="flex items-center gap-2.5 text-sm">
                      {p.ok
                        ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                        : <XCircle size={16} className="text-red-400 flex-shrink-0" />
                      }
                      <span className={p.ok ? "text-gray-700" : "text-gray-400"}>
                        {p.texto}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
