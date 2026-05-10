# Maya RPG — Sistema de Gestão Fisioterápica

> **Projeto Interdisciplinar** — 3º semestre ADS — FECAP — 2026/1

Sistema de gestão de tratamento fisioterápico para a Clínica
**Maya Yoshiko Yamamoto**, com app Android para os pacientes acompanharem
seus exercícios e backend Node.js + MySQL.

---

## 📂 Estrutura do projeto

```
maya-rpg/
├── Aplicativo/      # App Android (Java)
├── Backend/          # API REST (Node.js + Express)
├── BancoDeDados/         # Script SQL (schema + dados de teste)
└── README.md
```

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|------------|
| App Mobile | Java + Retrofit + Glide + MPAndroidChart + **Room (SQLite)** |
| Backend | Node.js + Express + JWT + bcryptjs |
| Banco de Dados | MySQL 8 |
| Cache offline | Room (SQLite local no celular) |

---

## ✅ Requisitos do PI atendidos

- ✅ App Android nativo (Java)
- ✅ Consumo de API REST com Retrofit
- ✅ Tratamento de JSON (Gson)
- ✅ Autenticação com JWT
- ✅ Banco de dados relacional (MySQL)
- ✅ **Persistência local de dados** (SQLite via Room — 5 telas funcionam offline)
- ✅ Indicadores e gráfico de evolução
- ✅ Padrão Repository + Cache-First
- ✅ Padrões de design (Material Design)
- ✅ LGPD (cadastro com consentimento)

---

# 🚀 Como rodar o projeto (passo a passo)

## Pré-requisitos

Instale antes de começar:

| Software | Versão | Link |
|----------|--------|------|
| Node.js | 18+ | https://nodejs.org |
| MySQL Server | 8+ | https://dev.mysql.com/downloads/installer/ |
| Android Studio | Hedgehog ou superior | https://developer.android.com/studio |
| JDK | 17 | https://adoptium.net/temurin/releases/?version=17 |

> 💡 No Windows, se o nome do usuário tem espaço (ex: "marlene augusto"),
> instale o **Eclipse Temurin JDK 17** em
> `C:\Program Files\Eclipse Adoptium\` para evitar erro do `jlink.exe`
> no Gradle.

---

## 1️⃣ Banco de Dados (MySQL)

### Criar o banco e importar dados

1. Abra o **MySQL Workbench**
2. Conecte na sua instância local (`Local instance MySQL`)
3. **File → Open SQL Script** → selecione o arquivo:
   ```
   database/maya_rpg_completo.sql
   ```
4. Clique no botão **⚡ Execute** (raio amarelo) ou pressione `Ctrl+Shift+Enter`
5. Aguarde executar — vai criar o banco `maya_rpg` com 11 tabelas e dados
   de teste

### Verificar se deu certo

No painel SCHEMAS (esquerda), expanda `maya_rpg`. Você deve ver:
- 11 tabelas (`usuarios`, `pacientes`, `exercicios`, etc.)
- Dados em todas elas

---

## 2️⃣ Backend (Node.js)

### Configurar variáveis de ambiente

1. Abra um terminal na pasta `backend/`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz da pasta `backend/` com este conteúdo:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=SUA_SENHA_AQUI
   DB_NAME=maya_rpg
   DB_PORT=3306

   JWT_SECRET=maya_rpg_secret_key_2026_fecap

   PORT=3000
   ```

   > ⚠️ Substitua `SUA_SENHA_AQUI` pela senha que você definiu ao instalar o
   > MySQL. **Sem aspas, sem espaços** antes/depois do `=`.

### Iniciar o servidor

```bash
npm start
```

Você deve ver:
```
✓ Conectado ao MySQL
Servidor rodando na porta 3000
```

### Liberar firewall (Windows)

Abra o **PowerShell como Administrador** e execute:
```powershell
netsh advfirewall firewall add rule name="Node 3000" dir=in action=allow protocol=TCP localport=3000
```

Isso permite que o app no celular conecte ao backend pela rede Wi-Fi local.

---

## 3️⃣ App Android

### Abrir o projeto

1. Abra o **Android Studio**
2. **Open** → selecione a pasta `android-app/`
3. Aguarde o **Gradle Sync** terminar (primeira vez pode demorar 2–5 min)

### Configurar o IP do backend

O app precisa saber o IP do PC que está rodando o backend. Para
descobrir o seu IP:

**Windows:**
```cmd
ipconfig
```
Procure o **IPv4** da rede Wi-Fi (ex: `192.168.0.159`).

**Mac/Linux:**
```bash
ifconfig
```

Depois abra o arquivo:
```
android-app/app/src/main/java/com/mayarpg/app/network/ApiClient.java
```

E ajuste a constante `BASE_URL`:
```java
private static final String BASE_URL = "http://192.168.0.XXX:3000/api/";
```
(troque `192.168.0.XXX` pelo seu IP)

### Rodar no celular

1. **Conecte o celular** com depuração USB ativa, OU inicie um emulador
2. **Build → Clean Project**
3. **Build → Rebuild Project**
4. Clique em **▶️ Run** (ou `Shift + F10`)

> ⚠️ O **celular** e o **PC** precisam estar na **mesma rede Wi-Fi** para
> o app conseguir acessar o backend.

---

## 🔑 Credenciais de teste

Após importar `maya_rpg_completo.sql`, três usuários estão prontos:

| Email | Senha | Perfil |
|-------|-------|--------|
| `maria.santos@email.com` | `paciente123` | **PACIENTE** (use no app mobile) |
| `maya@clinica.com` | `maya123` | PROFISSIONAL (Dra. Maya) |
| `admin@clinica.com` | `admin123` | ADMIN |

---

##  Funcionalidades do app

-  **Login + Cadastro** com validação de CPF/telefone/email + LGPD
-  **Home** com saudação, resumo do tratamento e atalhos para categorias
-  **Meus Exercícios** com filtro por categoria
  (alongamento / fortalecimento / respiração / mobilidade)
-  **Registrar Execução** com slider de dor 0-10 e observações
-  **Histórico** com gráfico de evolução da dor e estatísticas
-  **Notificações** (lembretes, consultas, progresso, sistema)
-  **Agendamento** de consultas (escolhe serviço, data e horário)
-  **Perfil** com dados pessoais, clínica, pagamentos e tema escuro
-  **Cache offline** (SQLite via Room) — Home, Exercícios, Histórico,
  Perfil e Pagamentos funcionam mesmo sem internet

---

##  Endpoints da API

Base URL: `http://localhost:3000/api`

### Autenticação
- `POST /auth/login` — login (retorna JWT)
- `POST /auth/cadastro` — cadastro de paciente

### Paciente (requer JWT)
- `GET /pacientes/me/dashboard` — resumo da Home
- `GET /pacientes/me/exercicios` — exercícios prescritos
- `GET /pacientes/me/historico` — execuções + gráfico
- `GET /pacientes/me/notificacoes` — notificações não lidas
- `PUT /notificacoes/:id/lida` — marca como lida
- `DELETE /notificacoes` — limpa todas
- `GET /pacientes/me/perfil` — dados pessoais + clínica
- `GET /pacientes/me/pagamentos` — histórico de pagamentos
- `POST /execucoes` — registra execução com nível de dor
- `GET /servicos` — lista serviços disponíveis
- `GET /agendamentos/horarios?data=YYYY-MM-DD` — horários disponíveis
- `POST /agendamentos` — cria agendamento

### Admin/Profissional (requer JWT + permissão)
- `GET /admin/dashboard` — métricas gerais
- `GET /admin/pacientes` — lista pacientes
- `GET /admin/pacientes/:id` — detalhes
- `GET /admin/exercicios` — biblioteca
- `POST /admin/exercicios` — criar
- `PUT /admin/exercicios/:id` — editar
- `DELETE /admin/exercicios/:id` — excluir
- `POST /admin/prescricoes` — prescrever
- `GET /admin/agendamentos` — lista consultas
- `PUT /admin/agendamentos/:id/status` — confirmar/cancelar
- `POST /admin/pagamentos` — registrar pagamento

---

##  Problemas comuns

### "Erro de conexão" no app
-  Backend está rodando? → veja o terminal do `npm start`
-  Firewall liberado? → comando `netsh` acima
-  IP correto no `ApiClient.java`? → confira com `ipconfig`
-  Celular e PC na mesma rede Wi-Fi?

### "Access denied for user 'root'" no backend
- A senha no `.env` está errada → edite `DB_PASSWORD`
- **Sem aspas, sem espaços** antes/depois do `=`

### Build falha com erro `jlink.exe`
- Caminho do usuário tem espaço no nome → use **JDK Eclipse Temurin** em
  `C:\Program Files\Eclipse Adoptium\`
- Configure em **File → Settings → Build, Execution → Gradle → Gradle JDK**

### Gradle Sync falha
- Verifique a conexão com a internet (ele baixa dependências)
- **File → Invalidate Caches → Invalidate and Restart**

### App quebra ao abrir alguma tela
- Veja o **Logcat** no Android Studio (filtre por `com.mayarpg.app`)
- Verifique se o IP em `ApiClient.java` está correto

## 📄 Licença

Projeto Interdisciplinar — Análise e Desenvolvimento de Sistemas, 3° Semestre | FECAP — 2026/1.
