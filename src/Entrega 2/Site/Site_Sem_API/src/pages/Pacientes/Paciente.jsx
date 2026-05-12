import { useState, useRef, useEffect } from "react";
import { Search, Plus, X, User, Stethoscope, Calendar, ClipboardList, CalendarPlus } from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { useEscFechar } from "../../hooks/useEscFechar";
import { dadosPacientes } from "../../data/pacientes";

const filtros = ["Todos", "Ativo", "Em Tratamento", "Alta", "Arquivado"];

const statusColors = {
  "Em Tratamento": "bg-blue-100 text-blue-700",
  Ativo:           "bg-green-100 text-green-700",
  Alta:            "bg-teal-100 text-teal-700",
  Arquivado:       "bg-gray-100 text-gray-500",
};

const statusOpcoes = ["Ativo", "Em Tratamento", "Alta", "Arquivado"];

const statusBtnColors = {
  "Em Tratamento": "bg-blue-600 text-white border-blue-600",
  Ativo:           "bg-green-600 text-white border-green-600",
  Alta:            "bg-teal-600 text-white border-teal-600",
  Arquivado:       "bg-gray-500 text-white border-gray-500",
};

const iniciais = (nome) => nome.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

export default function Pacientes() {
  const [pacientes, setPacientes]               = useState(dadosPacientes);
  const [filtroAtivo, setFiltroAtivo]           = useState("Todos");
  const [busca, setBusca]                       = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [indiceFocado, setIndiceFocado]         = useState(-1);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const { setNovoPacienteAberto, setNovaConsultaAberto } = useModal();
  const buscaRef = useRef(null);

  useEffect(() => {
    function handleClickFora(e) {
      if (buscaRef.current && !buscaRef.current.contains(e.target)) {
        setMostrarSugestoes(false);
        setIndiceFocado(-1);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const sugestoes = busca.trim().length > 0
    ? pacientes.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase())).slice(0, 5)
    : [];

  const pacientesFiltrados = pacientes.filter((p) => {
    const matchFiltro = filtroAtivo === "Todos" || p.status === filtroAtivo;
    const matchBusca  = p.nome.toLowerCase().includes(busca.toLowerCase());
    return matchFiltro && matchBusca;
  });

  function handleBuscaChange(e) {
    setBusca(e.target.value);
    setMostrarSugestoes(true);
    setIndiceFocado(-1);
  }

  function handleBuscaKeyDown(e) {
    if (!mostrarSugestoes || sugestoes.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndiceFocado((i) => Math.min(i + 1, sugestoes.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndiceFocado((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && indiceFocado >= 0) {
      e.preventDefault();
      selecionarSugestao(sugestoes[indiceFocado]);
    } else if (e.key === "Escape") {
      setMostrarSugestoes(false);
      setIndiceFocado(-1);
    }
  }

  function selecionarSugestao(paciente) {
    setBusca("");
    setMostrarSugestoes(false);
    setIndiceFocado(-1);
    abrirDetalhes(paciente);
  }

  function abrirDetalhes(paciente) {
    setPacienteSelecionado({ ...paciente });
  }

  function fecharDetalhes() {
    setPacienteSelecionado(null);
  }

  function alterarStatus(novoStatus) {
    setPacienteSelecionado((prev) => ({ ...prev, status: novoStatus }));
  }

  function salvarAlteracoes() {
    setPacientes((prev) =>
      prev.map((p) => (p.id === pacienteSelecionado.id ? pacienteSelecionado : p))
    );
    fecharDetalhes();
  }

  function abrirNovaConsulta() {
    fecharDetalhes();
    setNovaConsultaAberto(true);
  }

  useEscFechar(fecharDetalhes, !!pacienteSelecionado);

  return (
    <div className="p-6">
      {/* Topo */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pacientes</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie e visualize todos os pacientes da clínica</p>
        </div>
        <button
          onClick={() => setNovoPacienteAberto(true)}
          className="flex items-center gap-2 bg-[#005073] text-white px-4 py-2 rounded-xl hover:bg-[#003f5c] transition-colors"
        >
          <Plus size={18} />
          Novo Paciente
        </button>
      </div>

      {/* Busca e Filtros */}
      <div className="flex items-center gap-4 mb-6">

        <div className="relative flex-1 max-w-sm" ref={buscaRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#005073] transition-colors"
            placeholder="Buscar paciente..."
            value={busca}
            onChange={handleBuscaChange}
            onFocus={() => busca.trim().length > 0 && setMostrarSugestoes(true)}
            onKeyDown={handleBuscaKeyDown}
            autoComplete="off"
          />

          {mostrarSugestoes && sugestoes.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-30">
              {sugestoes.map((p, idx) => (
                <button
                  key={p.id}
                  onMouseDown={(e) => { e.preventDefault(); selecionarSugestao(p); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-50 last:border-0 ${
                    idx === indiceFocado ? "bg-[#005073]/5" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#005073] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {iniciais(p.nome)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.nome}</p>
                    <p className="text-xs text-gray-400 truncate">{p.idade} anos · {p.diagnostico}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </button>
              ))}
            </div>
          )}

          {mostrarSugestoes && busca.trim().length > 0 && sugestoes.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-30">
              <p className="text-sm text-gray-400">Nenhum paciente encontrado.</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltroAtivo(f)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filtroAtivo === f ? "bg-[#005073] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {pacientesFiltrados.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-[#005073] flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
              {iniciais(p.nome)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-gray-800">{p.nome}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{p.idade} anos • {p.diagnostico}</p>
            </div>
            <div className="text-right hidden md:block flex-shrink-0">
              <p className="text-xs text-gray-400">Responsável</p>
              <p className="text-sm font-medium text-gray-700">{p.responsavel}</p>
            </div>
            <div className="text-right hidden md:block flex-shrink-0">
              <p className="text-xs text-gray-400">Última consulta</p>
              <p className="text-sm font-medium text-gray-700">{p.ultimaConsulta}</p>
            </div>
            <button
              onClick={() => abrirDetalhes(p)}
              className="bg-[#FFF9F2] border border-gray-200 text-[#005073] text-sm px-4 py-2 rounded-xl hover:bg-[#005073] hover:text-white transition-colors flex-shrink-0"
            >
              Detalhes
            </button>
          </div>
        ))}

        {pacientesFiltrados.length === 0 && (
          <div className="text-center py-12 text-gray-400">Nenhum paciente encontrado.</div>
        )}
      </div>

      {/* Modal de Detalhes */}
      {pacienteSelecionado && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">

            <div className="bg-gradient-to-r from-[#005073] to-[#0099cc] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                  {iniciais(pacienteSelecionado.nome)}
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">{pacienteSelecionado.nome}</h2>
                  <p className="text-blue-100 text-sm">{pacienteSelecionado.idade} anos</p>
                </div>
              </div>
              <button onClick={fecharDetalhes} className="p-2 rounded-xl hover:bg-white/20 transition-colors text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
                  <Stethoscope size={18} className="text-[#005073] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Diagnóstico</p>
                    <p className="text-sm font-semibold text-gray-800">{pacienteSelecionado.diagnostico}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
                  <User size={18} className="text-[#005073] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Responsável</p>
                    <p className="text-sm font-semibold text-gray-800">{pacienteSelecionado.responsavel}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3 col-span-2">
                  <Calendar size={18} className="text-[#005073] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Última Consulta</p>
                    <p className="text-sm font-semibold text-gray-800">{pacienteSelecionado.ultimaConsulta}</p>
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
                      onClick={() => alterarStatus(s)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        pacienteSelecionado.status === s
                          ? statusBtnColors[s]
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
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
                    onClick={fecharDetalhes}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={salvarAlteracoes}
                    className="px-4 py-2 rounded-xl bg-[#005073] text-white hover:bg-[#003f5c] transition-colors text-sm font-medium"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
