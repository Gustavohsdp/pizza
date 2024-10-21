# Pizza - Aplicação de Gerenciamento de Pedidos de Pizza

Uma aplicação desenvolvida para um teste tecnico.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **NestJS**
- **Vitest**
- **Prisma**
- **Docker**
- **MySQL**

## Instruções para Rodar a Aplicação

### Pré-requisitos

- Ter o [Docker](https://www.docker.com/get-started) instalado em sua máquina.

### Passos para Execução

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:Gustavohsdp/pizza.git
   cd pizza
   ```

2. **Suba os containers:**
   Execute o seguinte comando para iniciar os containers do banco de dados e da aplicação:

   ```bash
   docker-compose up -d
   ```

3. **Verifique se os containers estão rodando:**
   Execute o comando abaixo para listar os containers em execução:

   ```bash
   docker ps
   ```

4. **Acesse o container da aplicação:**
   Copie o ID do container da aplicação e execute:

   ```bash
   docker exec -it {id_do_container} bash
   ```

5. **Execute o seed do banco de dados:**
   Dentro do container, aplique as migrações e popular o banco de dados com os seguintes comandos:

   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Acessando a Aplicação

Após seguir as instruções acima, a aplicação estará rodando e você poderá acessá-la em: http://localhost:3333.

### Testes

Para rodar os testes da aplicação, utilize os seguintes comandos:

**Para testes unitários:**

```bash
npm run test
```

**Para testes end-to-end:**

```bash
npm run test:e2e
```

## Documentação da API

Você poderá acessar a documentação da API com a aplicação em execução no seguinte endereço: http://localhost:3333/docs.

## Funcionalidades

- Criar um pedido
- Listar sabores
- Listar adicionais
- Listar tamanhos
