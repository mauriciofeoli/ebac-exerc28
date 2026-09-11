# Exercício de performance com k6

Testes de performance dos endpoints GraphQL de produtos e clientes da API EBAC.

## API

```powershell
cd api
yarn install
npm run prisma:generate
npm run docker:db
npm run db:init
npm start
```

## Testes

Com a API em execução, rode na raiz do repositório:

```powershell
k6 run performance/products.js
k6 run performance/customers.js
```

Para validar a configuração dos cenários sem executar a carga:

```powershell
k6 inspect performance/products.js
k6 inspect performance/customers.js
```

Os testes usam `admin/admin` por padrão. Para outro ambiente:

```powershell
$env:BASE_URL="http://localhost:3000/graphql"
$env:API_USERNAME="admin"
$env:API_PASSWORD="admin"
```