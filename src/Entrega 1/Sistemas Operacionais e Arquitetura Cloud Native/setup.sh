#!/bin/bash
# =============================================================================
# setup.sh — Script de Setup do Ambiente
# Projeto: Clínica Maya APP
# Disciplina: Sistemas Operacionais e Arquitetura Cloud Native
# =============================================================================

# ── Cores para output ─────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ── Funções auxiliares ────────────────────────────────────────────────────────
log_info()    { echo -e "${BLUE}[INFO]${NC}  $1"; }
log_success() { echo -e "${GREEN}[OK]${NC}    $1"; }
log_warning() { echo -e "${YELLOW}[AVISO]${NC} $1"; }
log_error()   { echo -e "${RED}[ERRO]${NC}  $1"; }

check_command() {
  if command -v "$1" &>/dev/null; then
    log_success "$1 já está instalado: $(command -v $1)"
    return 0
  else
    return 1
  fi
}

# ── Banner ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BLUE}============================================================${NC}"
echo -e "${BLUE}   SETUP DO AMBIENTE — CLÍNICA MAYA                        ${NC}"
echo -e "${BLUE}   App Android + Backend Spring Boot                        ${NC}"
echo -e "${BLUE}============================================================${NC}"
echo ""

# ── Verificar sistema operacional ─────────────────────────────────────────────
OS="$(uname -s)"
log_info "Sistema detectado: $OS"

if [[ "$OS" != "Linux" ]]; then
  log_warning "Este script foi projetado para Linux/WSL."
  log_warning "No Windows, execute via WSL (wsl) ou Git Bash."
fi

# ── Atualizar repositórios ────────────────────────────────────────────────────
echo ""
log_info "Atualizando lista de pacotes..."
sudo apt-get update -y &>/dev/null
log_success "Lista de pacotes atualizada."

# ── Instalar dependências básicas ─────────────────────────────────────────────
echo ""
log_info "Instalando dependências básicas (curl, wget, unzip, git)..."
sudo apt-get install -y curl wget unzip git &>/dev/null
log_success "Dependências básicas instaladas."

# ── Instalar Java 17 (LTS) ────────────────────────────────────────────────────
echo ""
log_info "Verificando instalação do Java..."
if check_command java; then
  JAVA_VERSION=$(java -version 2>&1 | head -n1)
  log_info "Versão atual: $JAVA_VERSION"
else
  log_info "Instalando Java 17 (JDK)..."
  sudo apt-get install -y openjdk-17-jdk &>/dev/null
  log_success "Java 17 instalado com sucesso."
fi

# Configurar JAVA_HOME
export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")
if ! grep -q "JAVA_HOME" ~/.bashrc; then
  echo "export JAVA_HOME=$JAVA_HOME" >> ~/.bashrc
  echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc
  log_success "JAVA_HOME configurado em ~/.bashrc"
fi

# ── Instalar Maven ────────────────────────────────────────────────────────────
echo ""
log_info "Verificando instalação do Maven..."
if check_command mvn; then
  log_info "Versão: $(mvn -version 2>&1 | head -n1)"
else
  log_info "Instalando Maven..."
  sudo apt-get install -y maven &>/dev/null
  log_success "Maven instalado com sucesso."
fi

# ── Instalar Android SDK (Command Line Tools) ─────────────────────────────────
echo ""
log_info "Verificando Android SDK..."
ANDROID_SDK_DIR="$HOME/android-sdk"

if [ -d "$ANDROID_SDK_DIR" ]; then
  log_success "Android SDK já encontrado em: $ANDROID_SDK_DIR"
else
  log_info "Baixando Android Command Line Tools..."
  mkdir -p "$ANDROID_SDK_DIR/cmdline-tools"
  cd /tmp

  wget -q "https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip" \
    -O android-cmdline-tools.zip

  if [ $? -eq 0 ]; then
    unzip -q android-cmdline-tools.zip -d "$ANDROID_SDK_DIR/cmdline-tools"
    mv "$ANDROID_SDK_DIR/cmdline-tools/cmdline-tools" \
       "$ANDROID_SDK_DIR/cmdline-tools/latest"
    log_success "Android Command Line Tools extraídos."

    # Configurar variáveis de ambiente
    if ! grep -q "ANDROID_HOME" ~/.bashrc; then
      echo "export ANDROID_HOME=$ANDROID_SDK_DIR" >> ~/.bashrc
      echo "export PATH=\$ANDROID_HOME/cmdline-tools/latest/bin:\$PATH" >> ~/.bashrc
      echo "export PATH=\$ANDROID_HOME/platform-tools:\$PATH" >> ~/.bashrc
      log_success "ANDROID_HOME configurado em ~/.bashrc"
    fi

    # Aceitar licenças e instalar plataformas
    log_info "Aceitando licenças do Android SDK..."
    yes | "$ANDROID_SDK_DIR/cmdline-tools/latest/bin/sdkmanager" --licenses &>/dev/null
    log_info "Instalando Android Platform 33 e Build Tools..."
    "$ANDROID_SDK_DIR/cmdline-tools/latest/bin/sdkmanager" \
      "platforms;android-33" "build-tools;33.0.0" "platform-tools" &>/dev/null
    log_success "Android SDK configurado com sucesso."
  else
    log_error "Falha ao baixar o Android SDK. Verifique sua conexão."
  fi
  cd - &>/dev/null
fi

# ── Instalar Gradle ───────────────────────────────────────────────────────────
echo ""
log_info "Verificando instalação do Gradle..."
if check_command gradle; then
  log_info "Versão: $(gradle -version 2>&1 | grep Gradle)"
else
  log_info "Instalando Gradle..."
  GRADLE_VERSION="8.5"
  wget -q "https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip" \
    -O /tmp/gradle.zip
  sudo unzip -q /tmp/gradle.zip -d /opt/
  sudo ln -sf "/opt/gradle-${GRADLE_VERSION}/bin/gradle" /usr/local/bin/gradle
  log_success "Gradle ${GRADLE_VERSION} instalado."
fi

# ── Instalar Docker ───────────────────────────────────────────────────────────
echo ""
log_info "Verificando instalação do Docker..."
if check_command docker; then
  log_info "Versão: $(docker --version)"
else
  log_info "Instalando Docker..."
  curl -fsSL https://get.docker.com | sudo sh &>/dev/null
  sudo usermod -aG docker "$USER"
  log_success "Docker instalado. Faça logout/login para aplicar permissões."
fi

# ── Verificar estrutura do projeto ────────────────────────────────────────────
echo ""
log_info "Verificando estrutura de diretórios do projeto..."
PROJECT_DIRS=("backend" "mobile" "scripts" "docs")
for dir in "${PROJECT_DIRS[@]}"; do
  if [ ! -d "./$dir" ]; then
    mkdir -p "./$dir"
    log_success "Diretório criado: ./$dir"
  else
    log_success "Diretório encontrado: ./$dir"
  fi
done

# ── Relatório final ───────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}   SETUP CONCLUÍDO COM SUCESSO!                             ${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo -e "  ${BLUE}Java:${NC}        $(java -version 2>&1 | head -n1)"
echo -e "  ${BLUE}Maven:${NC}       $(mvn -version 2>&1 | head -n1 | cut -c1-40)"
echo -e "  ${BLUE}Gradle:${NC}      $(gradle -version 2>&1 | grep Gradle | head -n1)"
echo -e "  ${BLUE}Docker:${NC}      $(docker --version 2>/dev/null || echo 'Requer reinicialização')"
echo -e "  ${BLUE}Android SDK:${NC} $ANDROID_SDK_DIR"
echo ""
log_warning "Execute 'source ~/.bashrc' para aplicar as variáveis de ambiente."
echo ""
