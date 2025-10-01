# Sistema de Autoatendimento para Restaurantes

Este projeto é um sistema de autoatendimento para restaurantes, inspirado nos tótens do McDonald's e Burger King, além de versões mobile para facilitar pedidos. Utilizando tecnologias modernas, buscamos recriar uma experiência intuitiva e eficiente para os clientes realizarem pedidos de forma independente.

## Tecnologias Utilizadas

- **Next.js** - Framework React para desenvolvimento frontend
- **TypeScript** - Tipagem estática para maior segurança no código
- **Figma** - Protótipos e design do sistema
- **Prisma** - ORM para gerenciamento do banco de dados
- **NeonDB** - Banco de dados PostgreSQL em nuvem
- **PostgreSQL** - Banco de dados relacional para armazenamento seguro
- **Tailwind CSS** - Estilização moderna e responsiva

## Visão Geral do Sistema

### Página Inicial
![Página Inicial](imagensRead/1.png)  
Tela inicial do restaurante, onde o usuário pode iniciar o processo de pedido.

### Catálogo de Produtos
![Catálogo](imagensRead/2.png)  
Listagem dos itens disponíveis no restaurante, categorizados para facilitar a navegação.

### Itens Selecionados
![Itens Selecionados](imagensRead/3.png)  
Tela que exibe os itens escolhidos pelo cliente antes de finalizar o pedido.

### Carrinho do Cliente
![Carrinho](imagensRead/4.png)  
Resumo do pedido, onde o cliente pode revisar e concluir a compra.

## Instalação e Uso


## Como rodar o projeto  

1. Instale as dependências:  
   ```sh
   npm install
   ```  

2. Configure o banco de dados no arquivo `.env`.  

3. Inicie o servidor de desenvolvimento:  
   ```sh
   npm run dev
   ```  

4. Acesse o projeto no navegador: [http://localhost:3000](http://localhost:3000)

## Variáveis de ambiente

Este projeto usa variáveis de ambiente para configurar o banco de dados e outras chaves.

- Copie o arquivo `.env.example` para `.env` e preencha os valores reais antes de rodar a aplicação.
- Por padrão o `.env` já está listado no `.gitignore` do projeto para evitar comitar segredos.

Exemplo rápido:

1. Copie o exemplo:

```sh
cp .env.example .env
```

2. Edite o `.env` e ajuste `DATABASE_URL` para o seu banco Postgres local ou hospedado.

### Rodando um Postgres local via Docker

Se você não tem um Postgres local, pode subir um com Docker Compose (já incluí um `docker-compose.yml` na raiz):

1. Subir o banco (no Windows com Docker Desktop):

```sh
npm run db:up
```

2. Verifique se o Postgres está ativo na porta 5432:

```sh
# exemplo: checar portas em uso (Windows WSL/bash)
ss -ltnp | grep 5432 || netstat -ano | grep 5432
```

3. Rode o seed para popular o banco:

```sh
npx prisma db seed
```

Se o comando `npx prisma db seed` falhar com erro de conexão, verifique se o container está rodando e se `DATABASE_URL` no seu `.env` corresponde ao host/porta/usuário da instância Postgres.

### Usando Neon (Postgres hospedado)

Se preferir usar um banco em nuvem (recomendado para facilidade), o Neon fornece PostgreSQL gratuito para desenvolvimento.

1. Crie uma conta em https://neon.tech e crie um novo project/database.
2. No painel do Neon, gere/abra a connection string (uma linha no formato `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?options`).
3. No seu projeto local, abra `.env` e substitua `DATABASE_URL` pela connection string fornecida pelo Neon. Exemplo:

```text
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/<database>?sslmode=require"
```

4. Depois de atualizar `.env`, rode os comandos Prisma:

```bash
npx prisma generate
npx prisma migrate deploy   # aplica migrações no banco Neon
npx prisma db seed          # popula o banco (seed)
```

Observação: em muitos provedores a opção `sslmode=require` ou `ssl=true` é necessária — use a string exatamente como o Neon fornece.

## Guia detalhado para recriar o ambiente (passo-a-passo)

Este passo-a-passo foi escrito para que outro desenvolvedor consiga clonar o repositório e deixar o projeto rodando localmente ou em um ambiente de teste (usando Neon como banco). Siga na ordem.

Pré-requisitos
- Node.js v18+ (recomendado) e npm
- Git
- Acesso à internet
- (opcional) Docker Desktop (se preferir rodar Postgres localmente)

1) Clonar o repositório

```bash
git clone <repo-url>
cd <repo-folder>
```

2) Instalar dependências

```bash
npm install
```

3) Preparar variáveis de ambiente

- Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

- Se for usar Neon (recomendado):
   - Crie um projeto em https://neon.tech
   - Copie a connection string (URI) que o Neon fornece
   - Cole no `.env` substituindo a `DATABASE_URL`

- Se preferir Postgres local (Docker): rode `npm run db:up` e mantenha `DATABASE_URL` apontando para `postgresql://postgres:postgres@localhost:5432/fullstackweek-donalds?schema=public`

4) Gerar cliente Prisma

```bash
npx prisma generate
```

5) Aplicar migrações (Neon) ou sincronizar esquema

- Se você estiver usando o Neon e quer aplicar migrações:

```bash
npx prisma migrate deploy
```

- Se estiver desenvolvendo localmente e preferir empurrar o schema sem migrações:

```bash
npx prisma db push
```

6) Popular banco (seed)

```bash
npx prisma db seed
```

Observações sobre o seed
- O seed usa `ts-node ./prisma/seed.ts` e cria um restaurante com slug `fsw-donalds`. Ele espera que a `DATABASE_URL` esteja correta.
- Se você vir erros de timeout como `Transaction already closed` - já removemos a transação longa e o seed agora executa operações sequenciais; se ainda houver erro, verifique latência/regras do provedor.

Erros comuns e como resolver
- `P1001 Can't reach database server at 'localhost:5432'`: o banco não está rodando no host/porta especificados. Verifique `DATABASE_URL` e se o container/serviço está ativo.
- `P2028 Transaction already closed` ou timeouts: problemas de latência; tente novamente ou rode `npx prisma db push` antes do seed para garantir o schema.
- Erro `docker` not found: instale Docker Desktop ou use Neon / Postgres nativo.

Checklist para validar que tudo está OK
- [ ] `.env` com `DATABASE_URL` correto
- [ ] `npx prisma generate` rodou sem erros
- [ ] `npx prisma migrate deploy` (ou `db push`) executado
- [ ] `npx prisma db seed` populou o banco
- [ ] `npm run dev` abre o app e `http://localhost:3000` redireciona para o restaurante

Se algo falhar, cole a saída do terminal aqui ou abra uma issue descrevendo o passo que falhou — eu posso ajudar a depurar.




