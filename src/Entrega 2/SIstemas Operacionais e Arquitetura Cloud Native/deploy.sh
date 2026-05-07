#!/bin/bash

# =============================================================
#  Script de Deploy - Clínica RPG
#  Uso: ./deploy.sh [start|stop|restart|status|logs]
# =============================================================

COMPOSE_FILE="docker-compose.yml"
PROJECT_NAME="clinica-rpg"

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()    { echo -e "${GREEN}[OK]${NC} $1"; }
warn()   { echo -e "${YELLOW}[AVISO]${NC} $1"; }
erro()   { echo -e "${RED}[ERRO]${NC} $1"; }

verificar_dependencias() {
  echo "Verificando dependências..."
  if ! command -v docker &>/dev/null; then
    erro "Docker não encontrado. Instale em https://docs.docker.com/get-docker/"
    exit 1
  fi
  if ! command -v docker-compose &>/dev/null && ! docker compose version &>/dev/null; then
    erro "Docker Compose não encontrado."
    exit 1
  fi
  log "Docker e Docker Compose encontrados."
}

verificar_env() {
  if [ ! -f "./backend/.env" ]; then
    warn "Arquivo .env não encontrado. Criando a partir do .env.example..."
    cp ./backend/.env.example ./backend/.env
    warn "Edite ./backend/.env com suas configurações antes de continuar."
  fi
}

start() {
  verificar_dependencias
  verificar_env
  echo ""
  echo "Iniciando containers..."
  docker-compose -f $COMPOSE_FILE up --build -d

  if [ $? -eq 0 ]; then
    echo ""
    log "Deploy realizado com sucesso!"
    log "API disponível em: http://localhost:3000"
    echo ""
    echo "Endpoints:"
    echo "  GET http://localhost:3000/pacientes"
    echo "  GET http://localhost:3000/consultas"
    echo "  GET http://localhost:3000/exercicios"
    echo "  GET http://localhost:3000/pagamentos"
  else
    erro "Falha ao iniciar os containers."
    exit 1
  fi
}

stop() {
  echo "Parando containers..."
  docker-compose -f $COMPOSE_FILE down
  log "Containers parados."
}

restart() {
  stop
  start
}

status() {
  echo "Status dos containers:"
  docker-compose -f $COMPOSE_FILE ps
}

logs() {
  docker-compose -f $COMPOSE_FILE logs -f
}

case "${1:-start}" in
  start)   start ;;
  stop)    stop ;;
  restart) restart ;;
  status)  status ;;
  logs)    logs ;;
  *)
    echo "Uso: ./deploy.sh [start|stop|restart|status|logs]"
    exit 1
    ;;
esac
