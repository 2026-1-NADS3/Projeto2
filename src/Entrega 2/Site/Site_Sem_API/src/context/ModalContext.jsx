import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [novoPacienteAberto, setNovoPacienteAberto] = useState(false)
  const [novaConsultaAberto, setNovaConsultaAberto] = useState(false)
  const [adicionarMembroAberto, setAdicionarMembroAberto] = useState(false)
  const [criarRelatorioAberto, setCriarRelatorioAberto] = useState(false)
  const [arquivadosAberto, setArquivadosAberto] = useState(false)
  const [pacienteAtivo, setPacienteAtivo] = useState(null)

  return (
    <ModalContext.Provider value={{
      novoPacienteAberto, setNovoPacienteAberto,
      novaConsultaAberto, setNovaConsultaAberto,
      adicionarMembroAberto, setAdicionarMembroAberto,
      criarRelatorioAberto, setCriarRelatorioAberto,
      arquivadosAberto, setArquivadosAberto,
      pacienteAtivo, setPacienteAtivo,
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
