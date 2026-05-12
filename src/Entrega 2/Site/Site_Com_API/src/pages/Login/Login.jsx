import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { auth } from '../../service/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  function handleChange(e) {
    setErro('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleLogin(e) {
    e.preventDefault()
    if (!form.email || !form.senha) {
      setErro('Preencha todos os campos.')
      return
    }
    setCarregando(true)
    try {
      const dados = await auth.login(form.email, form.senha)
      localStorage.setItem('token', dados.token)
      localStorage.setItem('usuario', JSON.stringify(dados.usuario))
      navigate('/home')
    } catch (err) {
      setErro(err.message || 'E-mail ou senha inválidos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#002f47]">

      {/* Camadas de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#002f47] via-[#005073] to-[#007a9a]" />

      {/* Círculos decorativos */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-sm" />
      <div className="absolute -bottom-40 -right-24 w-[600px] h-[600px] rounded-full bg-white/5 blur-sm" />
      <div className="absolute top-1/4 right-10 w-[200px] h-[200px] rounded-full bg-[#00a878]/20 blur-md" />
      <div className="absolute bottom-1/4 left-10 w-[150px] h-[150px] rounded-full bg-[#0099cc]/20 blur-md" />

      {/* Grade sutil no fundo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Topo do card com gradiente */}
          <div className="bg-gradient-to-r from-[#005073] to-[#0099cc] px-8 py-7 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-extrabold shadow-lg mb-3">
              MY
            </div>
            <h1 className="text-white text-xl font-bold">Instituto Maya</h1>
            <p className="text-blue-100 text-sm mt-0.5">Clínica de RPG</p>
          </div>

          {/* Formulário */}
          <div className="px-8 py-7">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Bem-vindo de volta</h2>
            <p className="text-gray-400 text-sm mb-6">Entre com suas credenciais para acessar</p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">E-mail</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#005073] focus:ring-2 focus:ring-[#005073]/10 transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Senha</label>
                <div className="relative">
                  <input
                    name="senha"
                    type={senhaVisivel ? 'text' : 'password'}
                    value={form.senha}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:border-[#005073] focus:ring-2 focus:ring-[#005073]/10 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {senhaVisivel ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end -mt-1">
                <button type="button" className="text-xs text-[#005073] hover:underline font-medium">
                  Esqueceu sua senha?
                </button>
              </div>

              {erro && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl">
                  {erro}
                </div>
              )}

              <button
                type="submit"
                disabled={carregando}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#005073] to-[#0099cc] text-white font-semibold hover:opacity-90 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:scale-100 transition-all duration-200 mt-1"
              >
                {carregando
                  ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  : <><LogIn size={18} /> Entrar</>
                }
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-6">
          © 2026 Instituto Maya · Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}
