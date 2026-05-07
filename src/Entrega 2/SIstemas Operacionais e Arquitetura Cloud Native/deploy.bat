@echo off
setlocal

:: =============================================================
::  Script de Deploy - Clinica RPG (Windows)
::  Uso: deploy.bat [start|stop|restart|status|logs]
:: =============================================================

set COMPOSE_FILE=docker-compose.yml
set ACTION=%1
if "%ACTION%"=="" set ACTION=start

:: Verificar Docker
docker --version >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Docker nao encontrado. Instale em https://docs.docker.com/get-docker/
  exit /b 1
)

:: Verificar .env
if not exist "backend\.env" (
  echo [AVISO] Arquivo .env nao encontrado. Copiando .env.example...
  copy "backend\.env.example" "backend\.env"
  echo [AVISO] Edite backend\.env com suas configuracoes.
)

if "%ACTION%"=="start" goto start
if "%ACTION%"=="stop" goto stop
if "%ACTION%"=="restart" goto restart
if "%ACTION%"=="status" goto status
if "%ACTION%"=="logs" goto logs

echo Uso: deploy.bat [start^|stop^|restart^|status^|logs]
exit /b 1

:start
echo Iniciando containers...
docker-compose -f %COMPOSE_FILE% up --build -d
if errorlevel 1 (
  echo [ERRO] Falha ao iniciar containers.
  exit /b 1
)
echo.
echo [OK] Deploy realizado com sucesso!
echo [OK] API disponivel em: http://localhost:3000
goto end

:stop
echo Parando containers...
docker-compose -f %COMPOSE_FILE% down
echo [OK] Containers parados.
goto end

:restart
call :stop
call :start
goto end

:status
docker-compose -f %COMPOSE_FILE% ps
goto end

:logs
docker-compose -f %COMPOSE_FILE% logs -f
goto end

:end
endlocal
