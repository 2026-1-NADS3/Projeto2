# Relatório — Containerização e Deploy Cloud Native
 
**Projeto:** Clínica RPG  
**Disciplina:** Sistemas Operacionais e Cloud Native
 
---
 
## Vantagens da Containerização
 
A containerização empacota a aplicação junto com todas as suas dependências dentro de um container isolado. Diferente de máquinas virtuais, containers compartilham o kernel do SO do host, sendo muito mais leves e rápidos.
 
Principais vantagens:
 
- **Portabilidade:** o ambiente roda de forma idêntica em qualquer máquina com Docker, eliminando o problema de "funciona na minha máquina"
- **Isolamento:** cada serviço tem seus próprios processos e rede — uma falha na API não afeta o banco, e vice-versa
- **Reprodutibilidade:** o ambiente é descrito em código (`Dockerfile` e `docker-compose.yml`), qualquer pessoa sobe o projeto com um comando
- **Escalabilidade:** novas instâncias são criadas rapidamente a partir da mesma imagem
- **Rollback simples:** basta trocar a tag da imagem para voltar a uma versão anterior
---
 
## Diferenças entre Ambiente Tradicional e Containerizado
 
| Aspecto | Tradicional | Containerizado |
|---|---|---|
| Instalação | Manual em cada máquina | Imagem Docker reutilizável |
| Portabilidade | Depende do SO e configs locais | Roda igual em qualquer host |
| Isolamento | Processos compartilham o SO | Cada serviço em container isolado |
| Conflito de versões | Frequente entre projetos | Eliminado |
| Reprodutibilidade | "Funciona na minha máquina" | Ambiente idêntico sempre |
| Tempo de deploy | Horas a dias | Minutos |
 
No modelo tradicional cada desenvolvedor precisa instalar o Node.js, o PostgreSQL e configurar variáveis de ambiente manualmente. Com Docker, o `docker-compose.yml` descreve toda a infraestrutura e qualquer pessoa sobe o projeto completo sem etapas manuais.
 
---
 
## Estratégia de Volumes e Persistência
 
Por padrão o sistema de arquivos de um container é efêmero — tudo é perdido quando o container é removido. Para o banco de dados, isso é inaceitável. O Docker resolve isso com **volumes**.
 
### Volume nomeado
 
O PostgreSQL usa um volume nomeado `postgres_data` mapeado para o diretório onde ele armazena os dados:
 
```yaml
services:
  db:
    volumes:
      - postgres_data:/var/lib/postgresql/data
 
volumes:
  postgres_data:
```
 
Com isso os dados persistem mesmo que o container seja removido ou atualizado.
 
### Inicialização automática do banco
 
O PostgreSQL executa automaticamente qualquer `.sql` em `/docker-entrypoint-initdb.d/` na primeira vez que sobe. O projeto mapeia o `init.sql` para esse diretório:
 
```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
  - ./backend/sql/init.sql:/docker-entrypoint-initdb.d/init.sql
```
 
O `init.sql` cria as tabelas e insere dados de exemplo automaticamente, sem nenhuma configuração manual.
 
### Healthcheck
 
A API pode tentar conectar ao banco antes dele estar pronto. Para evitar isso, foi configurado um healthcheck:
 
```yaml
db:
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres -d clinica"]
    interval: 10s
    timeout: 5s
    retries: 5
 
api:
  depends_on:
    db:
      condition: service_healthy
```
 
O Docker só inicia a API após o banco estar totalmente operacional.