import { useState, useEffect } from "react";
import { Calendar, Users, XCircle, AlertTriangle, TrendingUp } from "lucide-react";
import Stats from "../../components/ui/StatsCards";
import Acoes from "../../components/ui/AcoesRapidas";
import Consultas from "../../components/ui/Consultas";
import { dashboard as dashboardAPI } from "../../service/api";

const hoje = new Date().toLocaleDateString("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Dashboard() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    dashboardAPI.buscar()
      .then(setDados)
      .catch(console.error);
  }, []);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const nomeUsuario = usuario?.nome ?? "Dr(a).";

  const atendimentosHoje  = dados?.atendimentosHoje  ?? dados?.totalAgendamentosHoje ?? "–";
  const pacientesAtivos   = dados?.pacientesAtivos   ?? dados?.totalPacientes        ?? "–";
  const cancelamentos     = dados?.cancelamentosHoje ?? dados?.cancelamentos         ?? "–";
  const planosVencendo    = dados?.planosVencendo     ?? "–";
  const taxaOcupacao      = dados?.taxaOcupacao       ?? 0;
  const slotsTotal        = dados?.slotsTotal         ?? 11;
  const slotsPreenchidos  = dados?.slotsPreenchidos   ?? 0;
  const alertas           = dados?.alertas            ?? [];

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Saudação */}
      <div className="bg-gradient-to-r from-[#005073] to-[#0099cc] rounded-3xl px-7 py-6 flex items-center justify-between">
        <div>
          <p className="text-blue-200 text-sm capitalize">{hoje}</p>
          <h1 className="text-2xl font-bold text-white mt-1">Bom dia, {nomeUsuario}!</h1>
          <p className="text-blue-100 text-sm mt-1">
            Você tem{" "}
            <span className="font-bold text-white">{atendimentosHoje} atendimentos</span>{" "}
            agendados para hoje.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white/15 rounded-2xl px-5 py-4">
          <TrendingUp size={28} className="text-white" />
          <div>
            <p className="text-blue-100 text-xs">Taxa de ocupação</p>
            <p className="text-white text-2xl font-extrabold">{taxaOcupacao}%</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Stats
          label="Atendimentos Hoje"
          valor={String(atendimentosHoje)}
          descricao="Agendamentos do dia"
          icon={Calendar}
          corIcone="text-[#005073]"
          corFundo="bg-[#005073]/10"
        />
        <Stats
          label="Pacientes Ativos"
          valor={String(pacientesAtivos)}
          descricao="Total na clínica"
          icon={Users}
          corIcone="text-sky-600"
          corFundo="bg-sky-50"
        />
        <Stats
          label="Cancelamentos"
          valor={String(cancelamentos)}
          descricao="Hoje"
          icon={XCircle}
          corIcone="text-red-400"
          corFundo="bg-red-50"
        />
        <Stats
          label="Planos Vencendo"
          valor={String(planosVencendo)}
          descricao="Nos próximos 7 dias"
          icon={AlertTriangle}
          corIcone="text-amber-500"
          corFundo="bg-amber-50"
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex gap-5">
        <div className="flex-1">
          <Consultas />
        </div>

        <div className="w-72 flex flex-col gap-4">
          <Acoes />

          <div className="bg-[#005073] rounded-2xl p-5 text-white">
            <p className="text-xs text-blue-200 uppercase tracking-widest mb-1">Capacidade do Dia</p>
            <p className="text-4xl font-extrabold">{taxaOcupacao}%</p>
            <p className="text-xs text-blue-200 mt-1">
              {slotsPreenchidos} de {slotsTotal} slots preenchidos
            </p>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${taxaOcupacao}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-700 mb-3">Alertas</h3>
            <div className="flex flex-col gap-2.5">
              {alertas.length > 0 ? (
                alertas.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${a.cor ?? "bg-amber-400"}`} />
                    <p className="leading-snug">{a.texto ?? a.mensagem ?? String(a)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Nenhum alerta no momento.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
