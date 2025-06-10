import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...")

  // Criar usuário de exemplo
  const user = await prisma.user.upsert({
    where: { email: "exemplo@cosmic.com" },
    update: {},
    create: {
      email: "exemplo@cosmic.com",
      name: "Usuário Cósmico",
      avatarUrl: "https://github.com/shadcn.png",
    },
  })

  // Criar cartas de exemplo
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 7) // 7 dias no futuro

  const pastDate = new Date()
  pastDate.setDate(pastDate.getDate() - 1) // 1 dia no passado

  await prisma.letter.createMany({
    data: [
      {
        userId: user.id,
        title: "Carta para o Futuro",
        content:
          "Esta é uma mensagem que transcende o tempo e o espaço. Quando você ler isso, lembre-se de que o amor é eterno como as estrelas.",
        releaseDate: futureDate,
        uniqueLink: "exemplo-futuro-123",
        paymentStatus: "PAID",
        isFavorite: true,
      },
      {
        userId: user.id,
        title: "Mensagem Liberada",
        content:
          "Esta carta já foi liberada e pode ser lida. O universo conspirou para que esta mensagem chegasse até você no momento certo.",
        releaseDate: pastDate,
        uniqueLink: "exemplo-liberada-456",
        paymentStatus: "PAID",
        isFavorite: false,
      },
      {
        userId: user.id,
        title: "Carta Pendente",
        content: "Esta carta está aguardando pagamento para ser ativada.",
        releaseDate: futureDate,
        uniqueLink: "exemplo-pendente-789",
        paymentStatus: "PENDING",
        isFavorite: false,
      },
    ],
  })

  console.log("✅ Seed concluído com sucesso!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Erro durante o seed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
