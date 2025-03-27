<p align="center">
  <img src="https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000" width="99">
  <img src="https://img.icons8.com/?size=100&id=yjSayFwWHyCo&format=png&color=000000" width="99">
  <img src="https://img.icons8.com/?size=100&id=WOIMvKUjwCRp&format=png&color=000000" width="99">
  <img src="https://img.icons8.com/?size=100&id=23671&format=png&color=000000" width="99">
</p>
<h1 align="center">E-commerce Admin Dashboard</h1>
<p align="center">
  Este projeto <code>fullstack</code> foi desenvolvido em NextJS, Typescript, Clerk, Supabase e Stripe.
</p>

---

## 📍 Visão Geral

**_Objetivo_**

Desenvolvi o projeto E-commerce Admin (<a href="https://ecommerce-admin-jessicasantosb.vercel.app/">Confira aqui</a>) com o objetivo de aprimorar minhas habilidades na criação de um CMS (Content Management System). O foco foi entender e implementar as funcionalidades essenciais para gerenciar conteúdos e operações de um e-commerce de forma eficiente.

**_Motivação_**

Minha principal motivação foi construir uma base sólida para projetos freelance, criando uma solução escalável e personalizável que possa ser adaptada às necessidades de diferentes clientes. Esse projeto serve como um ponto de partida para futuros trabalhos, permitindo-me oferecer soluções completas e funcionais no mercado de e-commerce.

---

## 🧬 Funcionalidades

- Autenticação de usuários utilizando Clerk.
- Armazenamento seguro de informações no Supabase.
- Armazenamento seguro de imagens no Cloudinary.

---

## 🚀 Começando

### Pré-requisitos

Certifique-se de ter instalado:

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white)](https://nodejs.org/)  
[![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=flat&logo=Yarn&logoColor=white)](https://yarnpkg.com/)  
[![Prisma](https://img.shields.io/badge/Prisma-0C344B?style=flat&logo=Prisma&logoColor=white)](https://www.prisma.io/docs/concepts/components/prisma-cli)  
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat&logo=Stripe&logoColor=white)](https://docs.stripe.com/stripe-cli?locale=pt-BR)  

### ⚙️ Instalação

```sh
❯ git clone git@github.com:jessicasantosb/ecommerce-admin.git
```

```sh
❯ cd ecommerce-admin
```

```sh
❯ yarn
```

```sh
❯ yarn dev
```

#### Gere e instancie o Prisma Client:

```sh
❯ npx prisma generate
```

#### Configuração do Stripe

- Instale o Stripe CLI seguindo a documentação oficial.
- No terminal, execute o seguinte comando para escutar eventos do Stripe e encaminhá-los para sua API local:

```sh
❯ stripe listen --forward-to localhost:3001/api/webhook
```

- Adicione a chave secreta gerada ao arquivo .env.
- Para testar eventos localmente, dispare um webhook de pagamento bem-sucedido:

```sh
❯ stripe trigger payment_intent.succeeded
```

---

### 🤖 Uso

#### Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```sh
❯ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_key>
❯ CLERK_SECRET_KEY=<your_key>
❯ NEXT_PUBLIC_CLERK_SIGN_IN_URL=<your_key>
❯ NEXT_PUBLIC_CLERK_SIGN_UP_URL=<your_key>
❯ DATABASE_URL=<your_key>
❯ DIRECT_URLR=<your_key>
❯ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_key>
❯ STRIPE_API_KEY=<your_key>
❯ FRONTEND_STORE_URL=<your_key>
❯ STRIPE_WEBHOOK_SECRET=<your_key>
```

---

## 💻 Tecnologias

- Typescript
- Next 15
- Clerk
- Cloudinary
- Supabase
- Stripe
- Prisma
- React Hook Form
- Zod
- Zustand

---

## 🤝 Contribuições

- 🔰 Mencione quaisquer problemas conhecidos ou limitações.
- 🐛 Esboce seus planos para melhorias futuras.
