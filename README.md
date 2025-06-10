# 🌌 Cartas Cósmicas

Uma aplicação web para criar cartas misteriosas que só podem ser lidas na data escolhida pelo remetente.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca de interface
- **Prisma** - ORM para banco de dados
- **Auth.js** - Autenticação (Google + Magic Link)
- **PostgreSQL** - Banco de dados
- **ShadCN UI** - Componentes de interface
- **Tailwind CSS** - Estilização
- **TypeScript** - Tipagem estática
- **Zod** - Validação de dados

## 🛠️ Configuração

### 1. Instalar dependências

\`\`\`bash
npm install
\`\`\`

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local` e configure as variáveis:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. Configurar banco de dados

\`\`\`bash

# Gerar cliente Prisma

npm run db:generate

# Aplicar migrações

npm run db:push

# (Opcional) Executar seed

npm run db:seed
\`\`\`

### 4. Executar aplicação

\`\`\`bash
npm run dev
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
├── app/ # Páginas e rotas (App Router)
├── components/ # Componentes reutilizáveis
├── lib/ # Utilitários e configurações
│ ├── prisma.ts # Cliente Prisma
│ ├── services/ # Serviços de negócio
│ ├── validations/ # Schemas Zod
│ └── types/ # Tipos TypeScript
├── prisma/ # Schema e migrações
└── public/ # Arquivos estáticos
\`\`\`

## 🎯 Funcionalidades

- ✅ Autenticação com Supabase (Magic Link + Google)
- ✅ Criação de cartas com data de liberação
- ✅ Sistema de favoritos
- ✅ Contagem regressiva para liberação
- ✅ API REST completa
- ✅ Validação com Zod
- ✅ Design responsivo cósmico
- 🔄 Integração de pagamento (Kwify)
- 🔄 Webhooks de pagamento
- 🔄 Notificações por email

## 🗄️ Banco de Dados

### Modelos Principais

- **User**: Usuários da aplicação
- **Letter**: Cartas criadas pelos usuários

### Comandos Úteis

\`\`\`bash

# Visualizar banco no Prisma Studio

npm run db:studio

# Criar nova migração

npm run db:migrate

# Reset do banco

npx prisma migrate reset
\`\`\`

## 🔐 Autenticação

A aplicação usa Auth.js para autenticação com:

- Magic Link (email via Nodemailer)
- OAuth com Google
- Sessões seguras com JWT
- Adapter Prisma para persistência

## 💳 Pagamentos

Integração preparada para Kwify:

- Webhook endpoint: `/api/webhooks/payment`
- Status de pagamento: PENDING, PAID, FAILED
- Ativação automática após pagamento

## 🚀 Deploy

1. Configure as variáveis de ambiente na Vercel
2. Conecte o repositório
3. Deploy automático

## 📝 Scripts Disponíveis

- `npm run dev` - Executar em desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Executar build de produção
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:push` - Aplicar schema ao banco
- `npm run db:migrate` - Executar migrações
- `npm run db:studio` - Abrir Prisma Studio
- `npm run db:seed` - Executar seed do banco
