# Instituto Maya — Sistema de Gestão Clínica

Sistema web para gestão da clínica de RPG (Reeducação Postural Global) Instituto Maya. Permite que profissionais da saúde gerenciem pacientes, agendamentos, equipe e visualizem indicadores clínicos. Esta versão é um protótipo funcional com dados estáticos — sem dependência de backend ou API externa.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite 8 |
| Roteamento | React Router DOM 7 |
| Estilização | Tailwind CSS |
| Ícones | Lucide React |

---

## Pré-requisitos

- Node.js 18+

---

## Instalação e execução

**1. Clone o repositório e instale as dependências:**
```bash
git clone <url-do-repositorio>
cd Site_Sem_API
npm install
```

**2. Inicie o servidor de desenvolvimento:**
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
├── data/
│   ├── agendamentos.js       # Dados estáticos de agendamentos
│   ├── dashboard.js          # Dados estáticos dos indicadores
│   └── pacientes.js          # Dados estáticos de pacientes
├── hooks/
│   └── useEscFechar.jsx      # Fecha modal ao pressionar Esc
├── pages/
│   ├── Agenda/               # Agendamentos em visão diária e semanal
│   ├── Dashboard/            # Painel principal com indicadores
│   ├── Equipe/               # Membros cadastrados e níveis de acesso
│   ├── Login/                # Tela de autenticação (mock)
│   ├── Pacientes/            # Listagem, busca e detalhes de pacientes
│   └── Perfil/               # Dados do usuário logado
└── service/
    └── api.js                # Utilitário de autenticação (logout via localStorage)
```

---

## Páginas

### Login
Tela de autenticação com e-mail e senha. Qualquer combinação válida de campos é aceita — o login salva um token fictício e os dados do usuário no `localStorage`. Usuários não autenticados são redirecionados automaticamente para esta página.

### Dashboard
Painel com indicadores: atendimentos do dia, pacientes ativos, cancelamentos e planos vencendo. Exibe as próximas consultas do dia, taxa de ocupação e alertas da clínica. O nome do usuário logado é exibido na saudação.

### Agenda
Visualização dos agendamentos em modo **Diário** (grade de horários de 08h às 15h) e **Semanal** (grade por dia da semana). Mini calendário lateral para navegação entre datas. Taxa de ocupação calculada automaticamente com base nos agendamentos do dia.

### Pacientes
Lista completa de pacientes com busca por nome com autocomplete, filtro por status (Todos, Ativo, Em Tratamento, Alta, Arquivado) e modal de detalhes com alteração de status.

### Equipe
Cards dos profissionais cadastrados com carrossel de navegação. Exibe especialidade, cargo, número de pacientes e registro profissional. Seção de níveis de acesso por perfil (Admin, Fisioterapeuta, Recepção).

### Perfil
Visualização de foto de perfil e dados do usuário logado.

---

## Dados estáticos

Todos os dados da aplicação estão definidos localmente em `src/data/`:

| Arquivo | Conteúdo |
|---|---|
| `pacientes.js` | Lista de pacientes com nome, diagnóstico, responsável e status |
| `agendamentos.js` | Agendamentos do dia com horário, tipo e status |
| `dashboard.js` | Indicadores numéricos e alertas do painel principal |

Para alterar os dados exibidos na interface, basta editar esses arquivos diretamente.

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
