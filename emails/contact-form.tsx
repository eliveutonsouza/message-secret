import { Body, Container, Head, Heading, Html, Preview, Section, Text, Tailwind } from "@react-email/components"

interface ContactFormEmailProps {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactFormEmail({ name, email, subject, message }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Novo contato recebido: {subject}</Preview>
      <Tailwind>
        <Body className="bg-slate-900 text-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="text-center mb-8">
              <Heading className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                📧 Cartas Cósmicas
              </Heading>
              <Text className="text-purple-200 text-lg">Novo formulário de contato recebido</Text>
            </Section>

            <Section className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 mb-6">
              <Heading className="text-xl text-purple-200 mb-4">Detalhes do Contato</Heading>

              <Text className="text-purple-300 mb-2">
                <strong>👤 Nome:</strong> {name}
              </Text>

              <Text className="text-purple-300 mb-2">
                <strong>📧 Email:</strong> {email}
              </Text>

              <Text className="text-purple-300 mb-4">
                <strong>📝 Assunto:</strong> {subject}
              </Text>

              <Section className="bg-slate-700/50 rounded p-4 border border-purple-500/20">
                <Text className="text-purple-200 font-medium mb-2">Mensagem:</Text>
                <Text className="text-purple-300 whitespace-pre-wrap">{message}</Text>
              </Section>
            </Section>

            <Section className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
              <Text className="text-blue-300 text-sm">
                <strong>📅 Data:</strong> {new Date().toLocaleString("pt-BR")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
