# Trabalho Prático 2 - Desenvolvimento de Frontend

Projeto desenvolvido para a matéria de Programação para Web 2 da faculdade de Análise e Desenvolvimento de Sistemas.

## Pré-requisitos

- Docker

## Instalação

1. Para iniciar a aplicação com Docker, execute em TP2_FRONTEND_PRW2:
   ```
   docker compose up --build
   ```
   Será iniciado tanto o backend como o frontend também, sem a necessidade de executar o npm run dev.
   
2. Caso seja necessário resetar o banco de dados, execute os comandos abaixo.
   ```
   docker compose down -v
   docker compose up --build
   ```
   
## Uso

- A aplicação estará disponível em `http://localhost:3000`.
- A documentação do back-end está disponível em `http://localhost:3000/api`
- O frontend estará disponível em `http://localhost:5173`.
