# Scripts de Infraestrutura e Automação com Linux
**Projeto:** Clínica Maya  APP 
**Disciplina:** Sistemas Operacionais e Arquitetura Cloud Native

---

## Como executar no Windows

Como o Windows não roda scripts `.sh` nativamente, é necessário uma das opções abaixo:

### Opção 1 — WSL 
1. Abra o **Prompt de Comando** ou **PowerShell** como administrador
2. Execute: `wsl --install` (reinicie o PC depois)
3. Abra o **WSL** (Ubuntu) pelo menu iniciar
4. Navegue até a pasta dos scripts: `cd /mnt/c/Users/SeuNome/caminho/do/projeto`
5. Execute os scripts conforme descrito abaixo

### Opção 2 — Git Bash
1. Instale o [Git for Windows](https://git-scm.com/download/win)
2. Clique com botão direito na pasta dos scripts → **Git Bash Here**
3. Execute os scripts conforme descrito abaixo

---

## Estrutura dos arquivos

```
scripts/
├── setup.sh           ← Script de setup do ambiente
├── monitoramento.sh   ← Script de monitoramento do sistema
├── README.md          ← Este arquivo
└── logs/              ← Criado automaticamente pelo monitoramento
    └── monitoramento_YYYYMMDD_HHMMSS.log
```

---

## Script 1 — setup.sh

### O que faz?
Automatiza a instalação e configuração de todas as dependências necessárias para rodar o projeto do zero, sem precisar instalar nada manualmente.

### O que instala e configura?

| Ferramenta | Finalidade no projeto |
|---|---|
| **Java 17 (JDK)** | Compilar e rodar o backend Spring Boot |
| **Maven** | Gerenciar dependências e build do backend |
| **Gradle** | Build do app Android |
| **Android SDK** | Compilar o app Android (Platform 33 + Build Tools) |
| **Docker** | Containerizar o backend (usado na Entrega 2) |

### Como executar?

```bash
# Conceder permissão de execução
chmod +x setup.sh

# Executar
./setup.sh
```

### O que acontece ao executar?

1. Atualiza a lista de pacotes do sistema
2. Instala dependências básicas (curl, wget, git, unzip)
3. Verifica se Java 17 está instalado — se não, instala
4. Configura `JAVA_HOME` automaticamente no `~/.bashrc`
5. Verifica e instala o Maven
6. Baixa e configura o Android SDK com as plataformas necessárias
7. Aceita as licenças do Android SDK automaticamente
8. Instala o Gradle 8.5
9. Verifica e instala o Docker
10. Cria a estrutura de diretórios do projeto (`backend/`, `mobile/`, `scripts/`, `docs/`)
11. Exibe um relatório final com as versões instaladas

### Exemplo de saída esperada

```
[INFO]  Atualizando lista de pacotes...
[OK]    Lista de pacotes atualizada.
[OK]    java já está instalado
[OK]    Maven instalado com sucesso.
[OK]    Android SDK configurado com sucesso.

============================================================
   SETUP CONCLUÍDO COM SUCESSO!
============================================================
  Java:        openjdk version "17.0.x"
  Maven:       Apache Maven 3.x.x
  Gradle:      Gradle 8.5
  Docker:      Docker version 24.x.x
  Android SDK: /home/usuario/android-sdk
```

---

## Script 2 — monitoramento.sh

### O que faz?
Coleta e exibe métricas do sistema em tempo real enquanto o projeto está em execução, salvando tudo em um arquivo de log com timestamp. Também dispara alertas quando os recursos ultrapassam limites configurados.

### O que monitora?

| Métrica | O que indica |
|---|---|
| **CPU (%)** | Quanto do processador está sendo usado |
| **Memória RAM (%)** | Quanto da memória está ocupada |
| **Disco (%)** | Espaço em disco utilizado |
| **Processo Spring Boot** | Se a API está rodando, PID, CPU e memória do processo |
| **Containers Docker** | Quais containers estão ativos e seus status |

### Limites de alerta configurados

| Recurso | Limite padrão |
|---|---|
| CPU | 80% |
| Memória | 85% |
| Disco | 90% |

> É possível esses valores nas variáveis `ALERTA_CPU`, `ALERTA_MEM` e `ALERTA_DISCO` no início do script.

### Configurações padrão

```bash
INTERVALO=5       # coleta a cada 5 segundos
TOTAL_COLETAS=12  # 12 coletas = ~1 minuto de monitoramento
```

> Para monitorar por mais tempo, é necessário aumentar `TOTAL_COLETAS`. Exemplo: 60 coletas × 5s = 5 minutos.

### Como executar?

```bash
# Dar permissão de execução
chmod +x monitoramento.sh

# Executar
./monitoramento.sh
```

### Exemplo de saída no terminal

```
╔══════════════════════════════════════════════════════════╗
║     MONITORAMENTO DO SISTEMA — CLÍNICA MAYA              ║
║     Iniciado em: 30/03/2026 10:45:00                     ║
╚══════════════════════════════════════════════════════════╝

── Coleta 1/12 — 2026-03-30 10:45:00 ──────────────────
  CPU:          12.3%
  Memória:      54.7% (2240MB usados / 4096MB total | livre: 1856MB)
  Disco (/):    38% (15G usados / 40G total | livre: 25G)
  Spring Boot:  RODANDO — PID:3842 | CPU:4.2% | MEM:312MB
  Docker:       Containers ativos:
                → clinica-maya-api (Up 2 hours)
                → clinica-maya-db  (Up 2 hours)
```

### Arquivo de log gerado

O script salva um `.log` em `./logs/` com o formato:

```
TIMESTAMP | CPU(%) | MEM_USADO(MB) | MEM_TOTAL(MB) | MEM(%) | DISCO(%) | SPRING_BOOT
2026-03-30 10:45:00 | 12.3% | 2240MB | 4096MB | 54.7% | 38% | RODANDO
2026-03-30 10:45:05 | 14.1% | 2280MB | 4096MB | 55.7% | 38% | RODANDO
...
```

---

## Fluxo recomendado de uso

```
1. Execute setup.sh    →  Instala tudo do zero
2. Suba o backend      →  ./mvnw spring-boot:run (na pasta backend/)
3. Execute monitoramento.sh  →  Acompanha os recursos em tempo real
```

---

## Referências técnicas

- [Documentação WSL — Microsoft](https://learn.microsoft.com/pt-br/windows/wsl/)
- [Android SDK Command Line Tools](https://developer.android.com/studio/command-line)
- [Spring Boot — Maven Plugin](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/html/)
- [Docker Docs](https://docs.docker.com/)
