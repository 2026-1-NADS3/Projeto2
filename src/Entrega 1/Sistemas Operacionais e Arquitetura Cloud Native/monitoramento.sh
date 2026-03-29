#!/bin/bash
# =============================================================================
# monitoramento.sh — Script de Monitoramento do Sistema
# Projeto: Clínica Maya — App Android + Backend Spring Boot
# Disciplina: Infraestrutura e Automação com Linux
# =============================================================================

# ── Cores ─────────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# ── Configurações ─────────────────────────────────────────────────────────────
INTERVALO=5              # segundos entre cada coleta
TOTAL_COLETAS=12         # total de coletas (12 x 5s = 1 minuto de monitoramento)
LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/monitoramento_$(date +%Y%m%d_%H%M%S).log"
ALERTA_CPU=80            # % de CPU para disparar alerta
ALERTA_MEM=85            # % de memória para disparar alerta
ALERTA_DISCO=90          # % de disco para disparar alerta

# ── Criar diretório de logs ───────────────────────────────────────────────────
mkdir -p "$LOG_DIR"

# ── Funções ───────────────────────────────────────────────────────────────────
log() {
  local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
  echo "$msg" >> "$LOG_FILE"
  echo -e "$1"
}

alerta() {
  echo -e "${RED}[ALERTA]${NC} $1"
  echo "[ALERTA] $(date '+%Y-%m-%d %H:%M:%S') — $1" >> "$LOG_FILE"
}

# ── Coletar CPU ───────────────────────────────────────────────────────────────
get_cpu() {
  CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1 | tr -d ' ')
  # Fallback para sistemas onde o formato é diferente
  if [ -z "$CPU" ]; then
    CPU=$(grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {printf "%.1f", usage}')
  fi
  echo "$CPU"
}

# ── Coletar Memória ───────────────────────────────────────────────────────────
get_mem() {
  MEM_TOTAL=$(free -m | awk '/^Mem:/{print $2}')
  MEM_USADO=$(free -m | awk '/^Mem:/{print $3}')
  MEM_LIVRE=$(free -m | awk '/^Mem:/{print $4}')
  MEM_PERCENT=$(awk "BEGIN {printf \"%.1f\", ($MEM_USADO/$MEM_TOTAL)*100}")
  echo "$MEM_PERCENT|$MEM_USADO|$MEM_TOTAL|$MEM_LIVRE"
}

# ── Coletar Disco ─────────────────────────────────────────────────────────────
get_disco() {
  df -h / | awk 'NR==2 {
    gsub(/%/,"",$5);
    print $5"|"$3"|"$2"|"$4
  }'
}

# ── Verificar processo Spring Boot ────────────────────────────────────────────
get_spring_boot() {
  PID=$(pgrep -f "spring-boot\|java.*\.jar" 2>/dev/null | head -1)
  if [ -n "$PID" ]; then
    MEM_PROC=$(ps -o rss= -p "$PID" 2>/dev/null | awk '{printf "%.0f", $1/1024}')
    CPU_PROC=$(ps -o %cpu= -p "$PID" 2>/dev/null | tr -d ' ')
    echo "RODANDO|PID:$PID|CPU:${CPU_PROC}%|MEM:${MEM_PROC}MB"
  else
    echo "PARADO|-|-|-"
  fi
}

# ── Verificar Docker ──────────────────────────────────────────────────────────
get_docker() {
  if command -v docker &>/dev/null && docker info &>/dev/null 2>&1; then
    CONTAINERS=$(docker ps --format "{{.Names}}|{{.Status}}" 2>/dev/null)
    if [ -n "$CONTAINERS" ]; then
      echo "$CONTAINERS"
    else
      echo "NENHUM_CONTAINER_ATIVO"
    fi
  else
    echo "DOCKER_NAO_DISPONIVEL"
  fi
}

# ── Banner ────────────────────────────────────────────────────────────────────
clear
echo -e "${CYAN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     MONITORAMENTO DO SISTEMA — CLÍNICA MAYA              ║${NC}"
echo -e "${CYAN}║     Iniciado em: $(date '+%d/%m/%Y %H:%M:%S')                    ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Log sendo salvo em: ${YELLOW}$LOG_FILE${NC}"
echo -e "  Coletando ${TOTAL_COLETAS} amostras a cada ${INTERVALO}s..."
echo ""

# Cabeçalho do log
echo "==============================================================" >> "$LOG_FILE"
echo " MONITORAMENTO — CLÍNICA MAYA — $(date '+%d/%m/%Y %H:%M:%S')" >> "$LOG_FILE"
echo "==============================================================" >> "$LOG_FILE"
echo "TIMESTAMP | CPU(%) | MEM_USADO(MB) | MEM_TOTAL(MB) | MEM(%) | DISCO(%) | SPRING_BOOT" >> "$LOG_FILE"
echo "--------------------------------------------------------------" >> "$LOG_FILE"

# ── Loop de monitoramento ─────────────────────────────────────────────────────
for ((i=1; i<=TOTAL_COLETAS; i++)); do

  CPU=$(get_cpu)
  MEM_INFO=$(get_mem)
  MEM_PERCENT=$(echo "$MEM_INFO" | cut -d'|' -f1)
  MEM_USADO=$(echo "$MEM_INFO"   | cut -d'|' -f2)
  MEM_TOTAL=$(echo "$MEM_INFO"   | cut -d'|' -f3)
  MEM_LIVRE=$(echo "$MEM_INFO"   | cut -d'|' -f4)

  DISCO_INFO=$(get_disco)
  DISCO_PERCENT=$(echo "$DISCO_INFO" | cut -d'|' -f1)
  DISCO_USADO=$(echo "$DISCO_INFO"   | cut -d'|' -f2)
  DISCO_TOTAL=$(echo "$DISCO_INFO"   | cut -d'|' -f3)
  DISCO_LIVRE=$(echo "$DISCO_INFO"   | cut -d'|' -f4)

  SPRING=$(get_spring_boot)
  SPRING_STATUS=$(echo "$SPRING" | cut -d'|' -f1)

  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

  # ── Exibir no terminal ──────────────────────────────────────────────────────
  echo -e "${BLUE}── Coleta $i/$TOTAL_COLETAS — $TIMESTAMP ──────────────────${NC}"

  # CPU
  CPU_COLOR=$GREEN
  [ "$(echo "$CPU > $ALERTA_CPU" | bc -l 2>/dev/null || echo 0)" = "1" ] && CPU_COLOR=$RED
  echo -e "  CPU:          ${CPU_COLOR}${CPU}%${NC}"

  # Memória
  MEM_COLOR=$GREEN
  [ "$(echo "$MEM_PERCENT > $ALERTA_MEM" | bc -l 2>/dev/null || echo 0)" = "1" ] && MEM_COLOR=$RED
  echo -e "  Memória:      ${MEM_COLOR}${MEM_PERCENT}%${NC} (${MEM_USADO}MB usados / ${MEM_TOTAL}MB total | livre: ${MEM_LIVRE}MB)"

  # Disco
  DISCO_COLOR=$GREEN
  [ "$DISCO_PERCENT" -gt "$ALERTA_DISCO" ] 2>/dev/null && DISCO_COLOR=$RED
  echo -e "  Disco (/):    ${DISCO_COLOR}${DISCO_PERCENT}%${NC} (${DISCO_USADO} usados / ${DISCO_TOTAL} total | livre: ${DISCO_LIVRE})"

  # Spring Boot
  if [ "$SPRING_STATUS" = "RODANDO" ]; then
    SPRING_PID=$(echo "$SPRING" | cut -d'|' -f2)
    SPRING_CPU=$(echo "$SPRING" | cut -d'|' -f3)
    SPRING_MEM=$(echo "$SPRING" | cut -d'|' -f4)
    echo -e "  Spring Boot:  ${GREEN}RODANDO${NC} — $SPRING_PID | $SPRING_CPU | $SPRING_MEM"
  else
    echo -e "  Spring Boot:  ${YELLOW}NÃO DETECTADO${NC}"
  fi

  # Docker
  DOCKER_INFO=$(get_docker)
  if [ "$DOCKER_INFO" = "DOCKER_NAO_DISPONIVEL" ]; then
    echo -e "  Docker:       ${YELLOW}Não disponível${NC}"
  elif [ "$DOCKER_INFO" = "NENHUM_CONTAINER_ATIVO" ]; then
    echo -e "  Docker:       ${YELLOW}Nenhum container ativo${NC}"
  else
    echo -e "  Docker:       ${GREEN}Containers ativos:${NC}"
    echo "$DOCKER_INFO" | while IFS='|' read -r nome status; do
      echo -e "                → $nome ($status)"
    done
  fi

  # ── Alertas ─────────────────────────────────────────────────────────────────
  [ "$(echo "$CPU > $ALERTA_CPU" | bc -l 2>/dev/null || echo 0)" = "1" ] && \
    alerta "CPU acima de ${ALERTA_CPU}%! Atual: ${CPU}%"
  [ "$(echo "$MEM_PERCENT > $ALERTA_MEM" | bc -l 2>/dev/null || echo 0)" = "1" ] && \
    alerta "Memória acima de ${ALERTA_MEM}%! Atual: ${MEM_PERCENT}%"
  [ "$DISCO_PERCENT" -gt "$ALERTA_DISCO" ] 2>/dev/null && \
    alerta "Disco acima de ${ALERTA_DISCO}%! Atual: ${DISCO_PERCENT}%"

  # ── Gravar no log ────────────────────────────────────────────────────────────
  echo "$TIMESTAMP | ${CPU}% | ${MEM_USADO}MB | ${MEM_TOTAL}MB | ${MEM_PERCENT}% | ${DISCO_PERCENT}% | $SPRING_STATUS" >> "$LOG_FILE"

  echo ""

  # Aguardar próxima coleta (exceto na última)
  [ $i -lt $TOTAL_COLETAS ] && sleep "$INTERVALO"

done

# ── Resumo final ──────────────────────────────────────────────────────────────
echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   MONITORAMENTO CONCLUÍDO                                ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Relatório salvo em: ${YELLOW}$LOG_FILE${NC}"
echo ""
echo "--------------------------------------------------------------" >> "$LOG_FILE"
echo "Monitoramento encerrado em: $(date '+%d/%m/%Y %H:%M:%S')" >> "$LOG_FILE"
echo "==============================================================" >> "$LOG_FILE"
