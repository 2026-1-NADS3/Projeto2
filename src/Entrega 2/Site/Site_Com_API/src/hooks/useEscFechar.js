import { useEffect, useRef } from 'react'

export function useEscFechar(fechar, aberto) {
  const fecharRef = useRef(fechar)
  fecharRef.current = fechar

  useEffect(() => {
    if (!aberto) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') fecharRef.current()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [aberto])
}
