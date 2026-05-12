import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { dadosAgendamentos } from "../../data/agendamentos";

const hoje = new Date();

const statusColors = {
  Confirmado: "bg-green-100 text-green-700",
  Agora:      "bg-blue-100 text-blue-700",
  Aguardando: "bg-yellow-100 text-yellow-700",
  Cancelado:  "bg-red-100 text-red-700",
  Realizado:  "bg-blue-100 text-blue-700",
};

const horarios = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const coresTipo = [
  "bg-teal-100 text-teal-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-red-100 text-red-700",
  "bg-green-100 text-green-700",
  "bg-pink-100 text-pink-700",
];

function corParaTipo(tipo) {
  let hash = 0;
  for (const c of (tipo ?? '')) hash = (hash << 5) - hash + c.charCodeAt(0);
  return coresTipo[Math.abs(hash) % coresTipo.length];
}

function normalizarStatus(status) {
  const mapa = {
    CONFIRMADO: 'Confirmado', confirmado: 'Confirmado',
    CANCELADO:  'Cancelado',  cancelado:  'Cancelado',
    AGUARDANDO: 'Aguardando', aguardando: 'Aguardando',
    PENDENTE:   'Aguardando', pendente:   'Aguardando',
    REALIZADO:  'Realizado',  realizado:  'Realizado',
  };
  return mapa[status] ?? status;
}

function extrairHora(valor) {
  const d = new Date(valor);
  if (isNaN(d)) return valor ?? '';
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function mesmodia(valor, date) {
  const d = new Date(valor);
  return d.getDate() === date.getDate() &&
    d.getMonth() === date.getMonth() &&
    d.getFullYear() === date.getFullYear();
}

function normalizar(agendamento) {
  const dataISO = agendamento.dataHora ?? agendamento.data ?? agendamento.horario ?? '';
  return {
    id:        agendamento.id,
    horario:   extrairHora(dataISO),
    horarioFim: agendamento.horarioFim ? extrairHora(agendamento.horarioFim) : null,
    nome:      agendamento.paciente?.nome ?? agendamento.nomePaciente ?? agendamento.nome ?? '—',
    tipo:      agendamento.servico?.nome  ?? agendamento.tipo         ?? agendamento.tipoServico ?? '—',
    foco:      agendamento.foco           ?? agendamento.observacao   ?? '',
    status:    normalizarStatus(agendamento.status),
    dataISO,
  };
}

const agendamentosNormalizados = dadosAgendamentos.map(normalizar);

export default function Agenda() {
  const [visualizacao, setVisualizacao] = useState("Diário");
  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [mesCalendario, setMesCalendario] = useState(hoje.getMonth());
  const [anoCalendario, setAnoCalendario] = useState(hoje.getFullYear());
  const { setNovaConsultaAberto } = useModal();

  const diasNoMes = new Date(anoCalendario, mesCalendario + 1, 0).getDate();
  const primeiroDia = (new Date(anoCalendario, mesCalendario, 1).getDay() + 6) % 7;

  function mesAnterior() {
    if (mesCalendario === 0) { setMesCalendario(11); setAnoCalendario(anoCalendario - 1); }
    else setMesCalendario(mesCalendario - 1);
  }
  function proximoMes() {
    if (mesCalendario === 11) { setMesCalendario(0); setAnoCalendario(anoCalendario + 1); }
    else setMesCalendario(mesCalendario + 1);
  }

  function selecionarDia(dia) {
    setDataSelecionada(new Date(anoCalendario, mesCalendario, dia));
  }

  function getSemana(base) {
    const dow = (base.getDay() + 6) % 7;
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() - dow + i);
      return d;
    });
  }

  function semanaAnterior() {
    const nova = new Date(dataSelecionada);
    nova.setDate(nova.getDate() - 7);
    setDataSelecionada(nova);
    setMesCalendario(nova.getMonth());
    setAnoCalendario(nova.getFullYear());
  }
  function proximaSemana() {
    const nova = new Date(dataSelecionada);
    nova.setDate(nova.getDate() + 7);
    setDataSelecionada(nova);
    setMesCalendario(nova.getMonth());
    setAnoCalendario(nova.getFullYear());
  }

  const semana = getSemana(dataSelecionada);

  const ehHoje = (d) =>
    d.getDate() === hoje.getDate() &&
    d.getMonth() === hoje.getMonth() &&
    d.getFullYear() === hoje.getFullYear();

  const ehSelecionado = (dia) =>
    dia === dataSelecionada.getDate() &&
    mesCalendario === dataSelecionada.getMonth() &&
    anoCalendario === dataSelecionada.getFullYear();

  const ehHojeNoCalendario = (dia) =>
    dia === hoje.getDate() &&
    mesCalendario === hoje.getMonth() &&
    anoCalendario === hoje.getFullYear();

  const agendamentosDoDia = agendamentosNormalizados.filter(a => mesmodia(a.dataISO, dataSelecionada));
  const agendamentosDaSemana = semana.map(data =>
    agendamentosNormalizados.filter(a => mesmodia(a.dataISO, data))
  );

  const taxaOcupacao = horarios.length > 0
    ? Math.round((agendamentosDoDia.length / horarios.length) * 100)
    : 0;

  return (
    <div className="p-6 flex gap-6">
      {/* ── Coluna Principal ── */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Minha Agenda</h1>
            <p className="text-gray-500 text-sm mt-1">Gerencie suas consultas e sessões diárias</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
              {["Diário", "Semanal"].map((v) => (
                <button
                  key={v}
                  onClick={() => setVisualizacao(v)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    visualizacao === v ? "bg-[#005073] text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              onClick={() => setNovaConsultaAberto(true)}
              className="flex items-center gap-2 bg-[#005073] text-white px-4 py-2 rounded-xl hover:bg-[#003f5c] hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              <Plus size={18} />
              Nova Consulta
            </button>
          </div>
        </div>

        {/* ── Visão Diária ── */}
        {visualizacao === "Diário" && (
          <div className="flex flex-col gap-2">
            {horarios.map((h) => {
              const consulta = agendamentosDoDia.find((a) => a.horario === h);
              return (
                <div key={h} className="flex gap-4 items-start">
                  <span className="text-xs text-gray-400 w-12 pt-3 flex-shrink-0">{h}</span>
                  <div className="flex-1">
                    {consulta ? (
                      <div className={`bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow ${consulta.status === "Agora" ? "border-l-4 border-l-[#005073]" : ""}`}>
                        <div className="w-12 h-12 rounded-full bg-[#005073] flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {consulta.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${corParaTipo(consulta.tipo)}`}>
                              {consulta.tipo}
                            </span>
                            <span className="text-xs text-gray-400">
                              {consulta.horario}{consulta.horarioFim ? ` – ${consulta.horarioFim}` : ''}
                            </span>
                            {consulta.status === "Agora" && (
                              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-pulse">AGORA</span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-800">{consulta.nome}</h3>
                          {consulta.foco && <p className="text-sm text-gray-500">{consulta.foco}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[consulta.status] ?? 'bg-gray-100 text-gray-600'}`}>
                            {consulta.status}
                          </span>
                          <button className="bg-[#FFF9F2] border border-gray-200 text-[#005073] text-xs px-3 py-2 rounded-xl hover:bg-[#005073] hover:text-white transition-colors">
                            Abrir Ficha
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-10 border-b border-dashed border-gray-100" />
                    )}
                  </div>
                </div>
              );
            })}
            {agendamentosDoDia.length === 0 && (
              <p className="text-center text-gray-400 py-6 text-sm">Nenhum agendamento para este dia.</p>
            )}
          </div>
        )}

        {/* ── Visão Semanal ── */}
        {visualizacao === "Semanal" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">
                {semana[0].getDate()} de {meses[semana[0].getMonth()]} – {semana[6].getDate()} de {meses[semana[6].getMonth()]} {semana[6].getFullYear()}
              </p>
              <div className="flex gap-1">
                <button onClick={semanaAnterior} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={proximaSemana} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {semana.map((data, idx) => {
                const consultasDoDia = agendamentosDaSemana[idx];
                const isHoje = ehHoje(data);
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setDataSelecionada(data);
                        setMesCalendario(data.getMonth());
                        setAnoCalendario(data.getFullYear());
                      }}
                      className={`text-center py-2 px-1 rounded-xl transition-colors ${
                        isHoje
                          ? "bg-[#005073] text-white"
                          : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <p className={`text-xs font-medium ${isHoje ? "text-blue-200" : "text-gray-400"}`}>
                        {diasSemana[idx]}
                      </p>
                      <p className="text-base font-bold leading-tight">{data.getDate()}</p>
                    </button>

                    <div className="flex flex-col gap-1.5 min-h-28">
                      {consultasDoDia.length > 0
                        ? consultasDoDia.map((c) => (
                            <div
                              key={c.id}
                              className="bg-white rounded-xl p-2 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer"
                            >
                              <p className="text-xs text-gray-400 mb-1">{c.horario}</p>
                              <p className="text-xs font-semibold text-gray-800 leading-tight truncate">{c.nome}</p>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium mt-1 inline-block ${corParaTipo(c.tipo)}`}>
                                {c.tipo}
                              </span>
                            </div>
                          ))
                        : (
                          <div className="flex-1 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center min-h-20">
                            <p className="text-xs text-gray-300">Livre</p>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Coluna Direita ── */}
      <div className="w-72 flex-shrink-0 flex flex-col gap-4">
        {/* Mini Calendário */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-700 text-sm">
              {meses[mesCalendario]} {anoCalendario}
            </span>
            <div className="flex gap-1">
              <button onClick={mesAnterior} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronLeft size={15} />
              </button>
              <button onClick={proximoMes} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-1">
            {["S","T","Q","Q","S","S","D"].map((d, i) => (
              <span key={i} className="font-medium">{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: primeiroDia }, (_, i) => (
              <span key={`vazio-${i}`} />
            ))}
            {Array.from({ length: diasNoMes }, (_, i) => {
              const dia = i + 1;
              const selecionado = ehSelecionado(dia);
              const hojeNoMes = ehHojeNoCalendario(dia);
              return (
                <button
                  key={dia}
                  onClick={() => selecionarDia(dia)}
                  className={`p-1 rounded-full transition-colors text-xs leading-none aspect-square flex items-center justify-center ${
                    selecionado
                      ? "bg-[#005073] text-white font-bold"
                      : hojeNoMes
                      ? "ring-2 ring-[#005073] text-[#005073] font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>

        {/* Taxa de Ocupação */}
        <div className="bg-[#005073] rounded-2xl p-4 text-white">
          <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">Capacidade do Dia</p>
          <p className="text-4xl font-bold">{taxaOcupacao}%</p>
          <p className="text-xs text-blue-200 mt-1">
            {agendamentosDoDia.length} de {horarios.length} slots preenchidos
          </p>
          <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${taxaOcupacao}%` }} />
          </div>
        </div>

        {/* Pendências */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-3">Pendências Rápidas</h3>
          <p className="text-sm text-gray-400">Nenhuma pendência no momento.</p>
        </div>
      </div>
    </div>
  );
}
