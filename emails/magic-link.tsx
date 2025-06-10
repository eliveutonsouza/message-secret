import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components"

interface MagicLinkEmailProps {
  url: string
  host: string
}

export function MagicLinkEmail({ url, host }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Seu link mágico para acessar as Cartas Cósmicas</Preview>
      <Tailwind>
        <Body className="bg-slate-900 text-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="text-center mb-8">
              <Heading className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                ✨ Cartas Cósmicas
              </Heading>
              <Text className="text-purple-200 text-lg">
                Sua jornada através do espaço-tempo está pronta para começar!
              </Text>
            </Section>

            <Section className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 mb-6">
              <Heading className="text-xl text-purple-200 mb-4">🌟 Acesso à Dimensão Cósmica</Heading>
              <Text className="text-purple-300 mb-6">
                Clique no botão abaixo para acessar sua conta e começar a criar mensagens que transcendem o tempo:
              </Text>

              <div className="text-center">
                <Button
                  href={url}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg inline-block no-underline"
                >
                  🚀 Entrar na Jornada Cósmica
                </Button>
              </div>
            </Section>

            <Section className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20 mb-6">
              <Text className="text-purple-300 text-sm mb-2">
                <strong>🔒 Segurança:</strong> Este link é único e expira em 24 horas.
              </Text>
              <Text className="text-purple-300 text-sm">
                <strong>❓ Não solicitou?</strong> Ignore este email com segurança.
              </Text>
            </Section>

            <Section className="text-center">
              <Text className="text-purple-400 text-sm mb-2">Ou copie e cole este link no seu navegador:</Text>
              <Link href={url} className="text-purple-300 text-sm break-all">
                {url}
              </Link>
            </Section>

            <Section className="text-center mt-8 pt-6 border-t border-purple-500/30">
              <Text className="text-purple-400 text-xs">
                © 2024 Cartas Cósmicas • Feito com ❤️ para conectar corações através do universo
              </Text>
              <Text className="text-purple-500 text-xs mt-2">{host}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
