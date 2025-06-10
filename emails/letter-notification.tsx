import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Tailwind } from "@react-email/components"

interface LetterNotificationEmailProps {
  letterTitle?: string
  letterUrl: string
  senderName?: string
  releaseDate: string
}

export function LetterNotificationEmail({
  letterTitle,
  letterUrl,
  senderName,
  releaseDate,
}: LetterNotificationEmailProps) {
  const formattedDate = new Date(releaseDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Html>
      <Head />
      <Preview>Uma carta cósmica especial chegou para você!</Preview>
      <Tailwind>
        <Body className="bg-slate-900 text-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="text-center mb-8">
              <Heading className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                💌 Cartas Cósmicas
              </Heading>
              <Text className="text-purple-200 text-lg">
                Uma mensagem especial atravessou o espaço-tempo para chegar até você!
              </Text>
            </Section>

            <Section className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 mb-6">
              <Heading className="text-xl text-purple-200 mb-4">✨ {letterTitle || "Carta Misteriosa"}</Heading>

              {senderName && (
                <Text className="text-purple-300 mb-4">
                  <strong>De:</strong> {senderName}
                </Text>
              )}

              <Text className="text-purple-300 mb-4">
                <strong>📅 Data de liberação:</strong> {formattedDate}
              </Text>

              <Text className="text-purple-300 mb-6">
                Esta carta foi criada especialmente para você e só poderá ser lida na data programada. O amor verdadeiro
                transcende o tempo! 💫
              </Text>

              <div className="text-center">
                <Button
                  href={letterUrl}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg inline-block no-underline"
                >
                  🌟 Ver Carta Cósmica
                </Button>
              </div>
            </Section>

            <Section className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20 mb-6">
              <Text className="text-purple-300 text-sm italic text-center">
                "O amor não conhece distância nem tempo. Ele simplesmente é, como as estrelas que brilham há milhões de
                anos."
              </Text>
            </Section>

            <Section className="text-center mt-8 pt-6 border-t border-purple-500/30">
              <Text className="text-purple-400 text-xs">
                © 2024 Cartas Cósmicas • Conectando corações através do universo
              </Text>
              <Text className="text-purple-500 text-xs mt-2">Crie sua própria carta cósmica em cartascosmicas.com</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
