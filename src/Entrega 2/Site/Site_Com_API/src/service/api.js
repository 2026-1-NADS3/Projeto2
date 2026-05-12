const BASE_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const erro = await response.json().catch(() => ({}))
    throw new Error(erro.message || `Erro ${response.status}`)
  }

  return response.json()
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const auth = {
  login: (email, senha) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    }),

  cadastro: (dados) =>
    request('/auth/cadastro', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  },
}

// ── Dashboard (admin) ─────────────────────────────────────────────────────────

export const dashboard = {
  buscar: () => request('/admin/dashboard'),
}

// ── Pacientes (admin) ─────────────────────────────────────────────────────────

export const pacientes = {
  listar: () => request('/admin/pacientes'),
  buscar: (id) => request(`/admin/pacientes/${id}`),
}

// ── Exercícios (admin) ────────────────────────────────────────────────────────

export const exercicios = {
  listar: () => request('/admin/exercicios'),
  criar: (dados) =>
    request('/admin/exercicios', { method: 'POST', body: JSON.stringify(dados) }),
  atualizar: (id, dados) =>
    request(`/admin/exercicios/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
  excluir: (id) =>
    request(`/admin/exercicios/${id}`, { method: 'DELETE' }),
}

// ── Prescrições (admin) ───────────────────────────────────────────────────────

export const prescricoes = {
  criar: (dados) =>
    request('/admin/prescricoes', { method: 'POST', body: JSON.stringify(dados) }),
}

// ── Agendamentos (admin) ──────────────────────────────────────────────────────

export const agendamentos = {
  listar: () => request('/admin/agendamentos'),
  atualizarStatus: (id, status) =>
    request(`/admin/agendamentos/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
}

// ── Pagamentos (admin) ────────────────────────────────────────────────────────

export const pagamentos = {
  registrar: (dados) =>
    request('/admin/pagamentos', { method: 'POST', body: JSON.stringify(dados) }),
}

// ── Serviços ──────────────────────────────────────────────────────────────────

export const servicos = {
  listar: () => request('/servicos'),
}
