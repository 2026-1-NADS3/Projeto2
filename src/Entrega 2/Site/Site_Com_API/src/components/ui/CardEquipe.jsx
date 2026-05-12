const cargoGradients = {
  admin: "from-violet-500 to-purple-700",
  fisioterapeuta: "from-[#005073] to-[#0099cc]",
  recepcao: "from-teal-500 to-teal-700",
}

const cargoColors = {
  admin: "bg-violet-100 text-violet-700",
  fisioterapeuta: "bg-sky-100 text-sky-700",
  recepcao: "bg-teal-100 text-teal-700",
}

const cargoLabels = {
  admin: "Admin",
  fisioterapeuta: "Fisioterapeuta",
  recepcao: "Recepção",
}

export default function CardMembros({ nome, especialidade, cargo, pacientes, registro }) {
  const iniciais = nome.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const gradient = cargoGradients[cargo] ?? "from-gray-400 to-gray-600"

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Banner superior com gradiente */}
      <div className={`bg-gradient-to-br ${gradient} h-28 relative`}>
        {/* Padrão decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-3 right-4 w-16 h-16 rounded-full border-4 border-white" />
          <div className="absolute top-8 right-10 w-8 h-8 rounded-full border-2 border-white" />
          <div className="absolute -bottom-4 left-6 w-20 h-20 rounded-full border-4 border-white" />
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-16 h-16 rounded-2xl ring-4 ring-white shadow-md overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl`}>
              {iniciais}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="pt-11 pb-5 px-5 flex flex-col items-center gap-3 flex-1">
        {/* Status ativo */}
        <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Ativo
        </span>

        {/* Nome e cargo */}
        <div className="text-center">
          <h3 className="font-bold text-gray-800 text-base">{nome}</h3>
          <p className="text-sm text-gray-400 mt-0.5">{especialidade}</p>
        </div>

        {/* Badge */}
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${cargoColors[cargo] ?? "bg-gray-100 text-gray-600"}`}>
          {cargoLabels[cargo] ?? cargo}
        </span>

        {registro && (
          <p className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">{registro}</p>
        )}

        <div className="w-full border-t border-dashed border-gray-100 mt-1" />

        {/* Stat de pacientes */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pacientes ativos</p>
          <p className={`text-3xl font-extrabold ${pacientes ? "text-gray-800" : "text-gray-300"}`}>
            {pacientes ?? "—"}
          </p>
        </div>

        {/* Botão */}
        <button className="w-full text-sm py-2.5 rounded-xl border border-gray-200 text-[#005073] font-medium hover:bg-[#005073] hover:text-white hover:border-[#005073] transition-all duration-200 mt-1">
          Ver Perfil
        </button>
      </div>
    </div>
  )
}
