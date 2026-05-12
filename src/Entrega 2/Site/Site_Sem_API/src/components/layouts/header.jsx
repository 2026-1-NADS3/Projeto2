import { Search, KeyRound, LogOut, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'
import { auth } from '../../service/api'
import { dadosPacientes } from '../../data/pacientes'

const statusColors = {
  "Em Tratamento": "bg-blue-100 text-blue-700",
  Ativo:           "bg-green-100 text-green-700",
  Alta:            "bg-teal-100 text-teal-700",
  Arquivado:       "bg-gray-100 text-gray-500",
}

const iniciais = (nome) => nome.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

export default function Header() {
  const [menuAberto, setMenuAberto]             = useState(false)
  const [busca, setBusca]                       = useState('')
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [indiceFocado, setIndiceFocado]         = useState(-1)

  const menuRef  = useRef(null)
  const buscaRef = useRef(null)
  const navigate = useNavigate()
  const { setPacienteAtivo } = useModal()

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const nomeUsuario     = usuario?.nome  ?? 'Usuário'
  const cargoUsuario    = usuario?.cargo ?? usuario?.perfil ?? ''
  const iniciaisUsuario = iniciais(nomeUsuario)

  useEffect(() => {
    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAberto(false)
    }
    document.addEventListener('mousedown', handleClickFora)
    return () => document.removeEventListener('mousedown', handleClickFora)
  }, [])

  useEffect(() => {
    function handleClickFora(e) {
      if (buscaRef.current && !buscaRef.current.contains(e.target)) {
        setMostrarSugestoes(false)
        setIndiceFocado(-1)
      }
    }
    document.addEventListener('mousedown', handleClickFora)
    return () => document.removeEventListener('mousedown', handleClickFora)
  }, [])

  const sugestoes = busca.trim().length > 0
    ? dadosPacientes
        .filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
        .slice(0, 5)
    : []

  function handleBuscaChange(e) {
    setBusca(e.target.value)
    setMostrarSugestoes(true)
    setIndiceFocado(-1)
  }

  function handleBuscaKeyDown(e) {
    if (!mostrarSugestoes || sugestoes.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndiceFocado((i) => Math.min(i + 1, sugestoes.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndiceFocado((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && indiceFocado >= 0) {
      e.preventDefault()
      selecionarSugestao(sugestoes[indiceFocado])
    } else if (e.key === 'Escape') {
      setMostrarSugestoes(false)
      setIndiceFocado(-1)
    }
  }

  function selecionarSugestao(paciente) {
    setBusca('')
    setMostrarSugestoes(false)
    setIndiceFocado(-1)
    setPacienteAtivo(paciente)
  }

  function irParaPerfil() {
    navigate('/perfil')
    setMenuAberto(false)
  }

  function handleLogout() {
    auth.logout()
    setMenuAberto(false)
    navigate('/login')
  }

  return (
    <div className="sticky top-0 z-10 w-full bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex items-center justify-between">

      <div className="relative flex-1 max-w-sm" ref={buscaRef}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
        <input
          className="w-full pl-9 pr-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:border-[#005073] transition-colors"
          placeholder="Pesquisar pacientes..."
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
                onMouseDown={(e) => { e.preventDefault(); selecionarSugestao(p) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-50 last:border-0 ${
                  idx === indiceFocado ? 'bg-[#005073]/5' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#005073] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {iniciais(p.nome)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.nome}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {p.idade} anos{p.diagnostico ? ` · ${p.diagnostico}` : ''}
                  </p>
                </div>
                {p.status && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColors[p.status] ?? 'bg-gray-100 text-gray-500'}`}>
                    {p.status}
                  </span>
                )}
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

      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005073] to-[#0099cc] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {iniciaisUsuario}
            </div>
            <span className="text-sm font-medium text-gray-700">{nomeUsuario}</span>
            <ChevronDown
              size={15}
              className={`text-gray-400 transition-transform duration-200 ${menuAberto ? 'rotate-180' : ''}`}
            />
          </button>

          {menuAberto && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{nomeUsuario}</p>
                {cargoUsuario && <p className="text-xs text-gray-400 mt-0.5">{cargoUsuario}</p>}
              </div>
              <div className="p-1.5 flex flex-col gap-0.5">
                <button
                  onClick={irParaPerfil}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <KeyRound size={16} className="text-gray-400" />
                  Mudar senha
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut size={16} className="text-red-400" />
                  Sair da conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
