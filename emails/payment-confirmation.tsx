import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Tailwind } from "@react-email/components"

interface PaymentConfirmationEmailProps {
  letterTitle?: string
  amount: number
  paymentId: string
  letterUrl: string
}

export function PaymentConfirmationEmail({ letterTitle, amount, paymentId, letterUrl }: PaymentConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Pagamento confirmado - Sua carta cósmica está ativa!</Preview>
      <Tailwind>
        <Body className="bg-slate-900 text-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="text-center mb-8">
              <Heading className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                ✅ Cartas Cósmicas
              </Heading>
              <Text className="text-purple-200 text-lg">Pagamento confirmado com sucesso!</Text>
            </Section>

            <Section className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 mb-6">
              <Heading className="text-xl text-purple-200 mb-4">🎉 Sua carta está ativa!</Heading>

              <Text className="text-purple-300 mb-4">
                <strong>📝 Carta:</strong> {letterTitle || "Carta sem título"}
              </Text>

              <Text className="text-purple-300 mb-4">
                <strong>💰 Valor:</strong> R$ {amount.toFixed(2)}
              </Text>

              <Text className="text-purple-300 mb-4">
                <strong>🔢 ID do Pagamento:</strong> {paymentId}
              </Text>

              <Text className="text-purple-300 mb-6">
                Sua carta cósmica foi ativada com sucesso e agora está viajando através do espaço-tempo! Ela será
                revelada automaticamente na data programada. ✨
              </Text>

              <div className="text-center">
                <Button
                  href={letterUrl}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg inline-block no-underline"
                >
                  🌟 Ver Carta
                </Button>
              </div>
            </Section>

            <Section className="bg-green-900/20 rounded-lg p-4 border border-green-500/20 mb-6">
              <Text className="text-green-300 text-sm">
                <strong>✅ Próximos passos:</strong>
              </Text>
              <ul className="text-green-300 text-sm mt-2 space-y-1">
                <li>• Compartilhe o link da carta com a pessoa especial</li>
                <li>• Acompanhe o status no seu dashboard</li>
                <li>• Crie mais cartas cósmicas quando quiser</li>
              </ul>
            </Section>

            <Section className="text-center mt-8 pt-6 border-t border-purple-500/30">
              <Text className="text-purple-400 text-xs">
                © 2024 Cartas Cósmicas • Conectando corações através do universo
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
