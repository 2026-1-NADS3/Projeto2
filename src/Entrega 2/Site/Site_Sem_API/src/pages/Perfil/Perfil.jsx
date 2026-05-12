import { useState, useRef } from 'react'
import { Camera, Eye, EyeOff, Save, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Perfil() {
  const navigate = useNavigate()
  const inputFotoRef = useRef(null)

  const [fotoPreview, setFotoPreview] = useState(null)
  const [senhaVisivel, setSenhaVisivel] = useState({ atual: false, nova: false, confirmar: false })
  const [form, setForm] = useState({ senhaAtual: '', senhaNova: '', senhaConfirmar: '' })
  const [sucesso, setSucesso] = useState(false)

  function handleFoto(e) {
    const file = e.target.files[0]
    if (file) setFotoPreview(URL.createObjectURL(file))
  }

  function toggleSenha(campo) {
    setSenhaVisivel((prev) => ({ ...prev, [campo]: !prev[campo] }))
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSalvar() {
    setSucesso(true)
    setTimeout(() => setSucesso(false), 3000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      {/* Topo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
          <p className="text-gray-500 text-sm">Gerencie sua foto e segurança da conta</p>
        </div>
      </div>

      {/* Card Foto de Perfil */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-700 mb-5">Foto de Perfil</h2>

        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#005073] to-[#0099cc] flex items-center justify-center">
              {fotoPreview
                ? <img src={fotoPreview} alt="Foto de perfil" className="w-full h-full object-cover" />
                : <span className="text-white text-3xl font-bold">MY</span>
              }
            </div>
            <button
              onClick={() => inputFotoRef.current.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#005073] rounded-full flex items-center justify-center text-white hover:bg-[#003f5c] transition-colors shadow-md"
            >
              <Camera size={14} />
            </button>
            <input
              ref={inputFotoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFoto}
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Dra. Maya Yamamoto</p>
            <p className="text-sm text-gray-400 mt-0.5">Diretora Clínica · Admin</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => inputFotoRef.current.click()}
                className="text-sm px-4 py-2 rounded-xl bg-[#005073] text-white hover:bg-[#003f5c] transition-colors"
              >
                Mudar Foto
              </button>
              {fotoPreview && (
                <button
                  onClick={() => setFotoPreview(null)}
                  className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Remover
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG ou GIF. Máximo 2MB.</p>
          </div>
        </div>
      </div>

      {/* Card Mudar Senha */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-700 mb-5">Alterar Senha</h2>

        <div className="flex flex-col gap-4">
          {[
            { name: 'senhaAtual', label: 'Senha Atual', campo: 'atual' },
            { name: 'senhaNova', label: 'Nova Senha', campo: 'nova' },
            { name: 'senhaConfirmar', label: 'Confirmar Nova Senha', campo: 'confirmar' },
          ].map(({ name, label, campo }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">{label}</label>
              <div className="relative">
                <input
                  type={senhaVisivel[campo] ? 'text' : 'password'}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-[#005073] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => toggleSenha(campo)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {senhaVisivel[campo] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {sucesso && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-xl">
            Senha alterada com sucesso!
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSalvar}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#005073] text-white hover:bg-[#003f5c] transition-colors text-sm font-medium"
          >
            <Save size={16} />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  )
}
