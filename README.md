# Testes de Performance com k6 - EBAC

Repositório dedicado a testes de desempenho para a API GraphQL da EBAC.

## Objetivo

Avaliar o comportamento da API sob carga, medir tempos de resposta e validar a estabilidade dos endpoints de produtos e clientes.

## Tecnologias

- k6
- JavaScript
- GraphQL
- Node.js

## Pré-requisitos

- Node.js
- npm
- k6 instalado
- Docker (se for subir a base local)

## API local

```powershell
cd api
yarn install
npm run prisma:generate
npm run docker:db
npm run db:init
npm start
```

## Execução dos testes

Na raiz do projeto:

```powershell
k6 run performance/products.js
k6 run performance/customers.js
```

Para inspecionar os cenários sem executar a carga:

```powershell
k6 inspect performance/products.js
k6 inspect performance/customers.js
```

## Variáveis de ambiente

```powershell
$env:BASE_URL="http://localhost:3000/graphql"
$env:API_USERNAME="admin"
$env:API_PASSWORD="admin"
```

## Estrutura do projeto

- `api/` — backend de apoio;
- `performance/` — scripts de testes com k6;
- `tools/` — utilitários e materiais auxiliares.
