# Instituto Maya — Sistema de Gestão Clínica

Sistema web para gestão da clínica de RPG (Reeducação Postural Global) Instituto Maya. Permite que profissionais da saúde gerenciem pacientes, agendamentos, equipe e visualizem indicadores clínicos em tempo real.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite 8 |
| Roteamento | React Router DOM 7 |
| Estilização | Tailwind CSS |
| Ícones | Lucide React |
| HTTP | Fetch API nativo |
| Backend | Node.js + Express (repositório separado) |

---

## Pré-requisitos

- Node.js 18+
- Backend da API rodando (ver repositório `maya-rpg-backend`)

---

## Instalação e execução

**1. Clone o repositório e instale as dependências:**
```bash
git clone <url-do-repositorio>
cd Maya
npm install
```

**2. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_URL=http://localhost:3000
```

> Ajuste a URL caso o backend rode em outra porta ou endereço (ex: `http://192.168.0.159:3000` para acesso via celular na mesma rede).

**3. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Estrutura do projeto

```
src/
├── components/
│   ├── layouts/
│   │   ├── header.jsx        # Barra superior com busca global e menu do usuário
│   │   └── sidebar.jsx       # Menu lateral de navegação
│   ├── modals/
│   │   ├── ModalNovoPaciente.jsx
│   │   ├── ModalNovaConsulta.jsx
│   │   ├── ModalAdicionarMembro.jsx
│   │   ├── ModalArquivados.jsx
│   │   ├── ModalCriarRelatorio.jsx
│   │   └── ModalDetalhesPaciente.jsx
│   └── ui/
│       ├── AcoesRapidas.jsx  # Atalhos rápidos no dashboard
│       ├── CardEquipe.jsx    # Card de membro da equipe
│       ├── Consultas.jsx     # Lista de consultas do dia
│       └── StatsCards.jsx    # Cards de indicadores numéricos
├── context/
│   └── ModalContext.jsx      # Estado global dos modais
├── hooks/
│   └── useEscFechar.jsx      # Fecha modal ao pressionar Esc
├── pages/
│   ├── Agenda/               # Agendamentos em visão diária e semanal
│   ├── Dashboard/            # Painel principal com indicadores
│   ├── Equipe/               # Membros cadastrados e níveis de acesso
│   ├── Login/                # Tela de autenticação
│   ├── Pacientes/            # Listagem, busca e detalhes de pacientes
│   └── Perfil/               # Dados e senha do usuário logado
└── service/
    └── api.js                # Centraliza todas as chamadas à API
```

---

## Páginas

### Login
Autenticação via e-mail e senha. O token JWT retornado é salvo no `localStorage` e enviado automaticamente em todas as requisições subsequentes. Usuários não autenticados são redirecionados para esta página automaticamente.

### Dashboard
Painel com indicadores em tempo real: atendimentos do dia, pacientes ativos, cancelamentos e planos vencendo. Exibe as próximas consultas do dia, taxa de ocupação e alertas da clínica. O nome do usuário logado é exibido na saudação.

### Agenda
Visualização dos agendamentos em modo **Diário** (grade de horários de 08h às 15h) e **Semanal** (grade por dia da semana). Mini calendário lateral para navegação entre datas. Taxa de ocupação calculada automaticamente com base nos agendamentos do dia.

### Pacientes
Lista completa de pacientes com busca por nome com autocomplete, filtro por status (Todos, Ativo, Em Tratamento, Alta, Arquivado) e modal de detalhes com alteração de status.

### Equipe
Cards dos profissionais cadastrados com carrossel de navegação. Exibe especialidade, cargo, número de pacientes e registro profissional. Seção de níveis de acesso por perfil (Admin, Fisioterapeuta, Recepção).

### Perfil
Edição de foto de perfil, dados pessoais e alteração de senha do usuário logado.

---

## Integração com a API

Todas as chamadas HTTP estão centralizadas em `src/service/api.js`. O arquivo exporta módulos organizados por recurso:

```js
import { auth, pacientes, agendamentos, dashboard } from './service/api'

// Exemplos de uso
await auth.login(email, senha)
await pacientes.listar()
await agendamentos.listar()
await dashboard.buscar()
```

O token JWT é lido automaticamente do `localStorage` e adicionado ao header `Authorization: Bearer <token>` em todas as requisições autenticadas.

### Rotas consumidas

| Módulo | Método | Rota |
|---|---|---|
| `auth.login` | POST | `/auth/login` |
| `auth.cadastro` | POST | `/auth/cadastro` |
| `dashboard.buscar` | GET | `/admin/dashboard` |
| `pacientes.listar` | GET | `/admin/pacientes` |
| `pacientes.buscar(id)` | GET | `/admin/pacientes/:id` |
| `agendamentos.listar` | GET | `/admin/agendamentos` |
| `agendamentos.atualizarStatus(id, status)` | PUT | `/admin/agendamentos/:id/status` |
| `exercicios.listar` | GET | `/admin/exercicios` |
| `exercicios.criar(dados)` | POST | `/admin/exercicios` |
| `exercicios.atualizar(id, dados)` | PUT | `/admin/exercicios/:id` |
| `exercicios.excluir(id)` | DELETE | `/admin/exercicios/:id` |
| `prescricoes.criar(dados)` | POST | `/admin/prescricoes` |
| `pagamentos.registrar(dados)` | POST | `/admin/pagamentos` |
| `servicos.listar` | GET | `/servicos` |

---

## Autenticação e proteção de rotas

Todas as rotas internas (`/home`, `/agenda`, `/pacientes`, etc.) são protegidas pelo componente `RotaProtegida` em `App.jsx`. O fluxo é:

```
Usuário acessa rota interna
  └── tem token no localStorage?
        ├── Sim → renderiza a página normalmente
        └── Não → redireciona para /login
```

O logout chama `auth.logout()`, que remove o `token` e os dados do `usuario` do `localStorage` antes de redirecionar para `/login`.

---

## Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com hot reload
npm run build    # Build de produção na pasta dist/
npm run preview  # Pré-visualizar o build localmente
npm run lint     # Verificar erros de lint com ESLint
```

---

## Equipe de desenvolvimento

Projeto Integrador — 3º Semestre  
Instituto Maya · 2026
