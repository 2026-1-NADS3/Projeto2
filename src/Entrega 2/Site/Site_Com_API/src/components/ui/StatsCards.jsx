export default function Stats({ label, valor, icon: Icon, corIcone, corFundo, descricao }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${corFundo} flex items-center justify-center flex-shrink-0`}>
        <Icon size={22} className={corIcone} />
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-3xl font-extrabold text-gray-800 leading-none">{valor}</p>
        {descricao && <p className="text-xs text-gray-400 mt-1">{descricao}</p>}
      </div>
    </div>
  );
}
