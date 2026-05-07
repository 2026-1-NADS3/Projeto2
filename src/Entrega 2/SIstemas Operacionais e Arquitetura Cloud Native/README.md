# Clínica RPG — API Cloud Native

API REST containerizada para gerenciamento de clínica de fisioterapia (RPG).
Desenvolvida com Node.js + PostgreSQL, orquestrada via Docker Compose.

---

## Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| Node.js 20 | Runtime do backend |
| Express | Framework HTTP |
| PostgreSQL 16 | Banco de dados relacional |
| Docker | Containerização |
| Docker Compose | Orquestração dos serviços |

---

## Estrutura do Projeto

```
clinica-rpg/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── pacientes.js
│   │   │   ├── consultas.js
│   │   │   ├── exercicios.js
│   │   │   └── pagamentos.js
│   │   ├── db.js
│   │   └── server.js
│   │
│   ├── sql/
│   │   └── init.sql          
│   │
│   ├── package.json
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env                 
│   └── .env.example          
│
├── docker-compose.yml
├── deploy.sh                 
├── deploy.bat                
├── .gitignore
└── README.md
```

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado e rodando
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

---

## Configuração Inicial

Copie o arquivo de variáveis de ambiente:

```bash
cp backend/.env.example backend/.env
```

---

## Executando o Projeto

### Usando o script de deploy (recomendado)

**Linux / Mac:**
```bash
chmod +x deploy.sh
./deploy.sh start
```

**Windows:**
```bat
deploy.bat start
```

### Ou diretamente com Docker Compose

```bash
docker-compose up --build -d
```

---

## Comandos do Script de Deploy

| Comando | Descrição |
|---|---|
| `./deploy.sh start` | Sobe os containers (padrão) |
| `./deploy.sh stop` | Para e remove os containers |
| `./deploy.sh restart` | Reinicia tudo |
| `./deploy.sh status` | Exibe status dos containers |
| `./deploy.sh logs` | Exibe logs em tempo real |

---

## Endpoints da API

Base URL: `http://localhost:3000`

### Geral
| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Status da API |

### Pacientes
| Método | Rota | Descrição |
|---|---|---|
| GET | `/pacientes` | Listar todos |
| GET | `/pacientes/:id` | Buscar por ID |
| POST | `/pacientes` | Cadastrar novo |

### Consultas
| Método | Rota | Descrição |
|---|---|---|
| GET | `/consultas` | Listar todas |
| POST | `/consultas` | Agendar consulta |

### Exercícios
| Método | Rota | Descrição |
|---|---|---|
| GET | `/exercicios` | Listar todos |
| POST | `/exercicios` | Prescrever exercício |

### Pagamentos
| Método | Rota | Descrição |
|---|---|---|
| GET | `/pagamentos` | Listar todos |
| PATCH | `/pagamentos/:id/pagar` | Confirmar pagamento |

---

## Exemplos de Requisição

**Cadastrar paciente:**
```bash
curl -X POST http://localhost:3000/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Lima", "idade": 32, "email": "ana@email.com", "telefone": "11999990003"}'
```

**Agendar consulta:**
```bash
curl -X POST http://localhost:3000/consultas \
  -H "Content-Type: application/json" \
  -d '{"paciente_id": 1, "data": "2026-05-20", "horario": "09:00"}'
```

---

## Parando os Containers

```bash
./deploy.sh stop
# ou
docker-compose down
```

Para remover também os volumes (apaga os dados do banco):
```bash
docker-compose down -v
```

---

## Verificando Containers Ativos

```bash
docker ps
# ou
./deploy.sh status
```

---

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `PORT` | Porta da API | `3000` |
| `DB_HOST` | Host do banco | `db` |
| `DB_PORT` | Porta do banco | `5432` |
| `DB_USER` | Usuário PostgreSQL | `postgres` |
| `DB_PASSWORD` | Senha do banco | — |
| `DB_NAME` | Nome do banco | `clinica` |


