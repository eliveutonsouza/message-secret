import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bem-vindo à jornada cósmica das Cartas Cósmicas!</Preview>
      <Tailwind>
        <Body className="bg-slate-900 text-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            <Section className="text-center mb-8">
              <Heading className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                🚀 Cartas Cósmicas
              </Heading>
              <Text className="text-purple-200 text-lg">
                Bem-vindo à sua jornada através do espaço-tempo!
              </Text>
            </Section>

            <Section className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 mb-6">
              <Heading className="text-xl text-purple-200 mb-4">
                Olá{name ? `, ${name}` : ""}! ✨
              </Heading>

              <Text className="text-purple-300 mb-4">
                Que alegria ter você conosco! Agora você pode criar mensagens
                que transcendem o tempo e conectar corações através do universo.
              </Text>

              <Text className="text-purple-300 mb-6">
                <strong>🌟 O que você pode fazer:</strong>
              </Text>

              <ul className="text-purple-300 mb-6 space-y-2">
                <li>💌 Criar cartas que só são reveladas na data escolhida</li>
                <li>⭐ Favoritar suas mensagens mais especiais</li>
                <li>🔗 Compartilhar links únicos com pessoas queridas</li>
                <li>📊 Acompanhar suas cartas no dashboard</li>
              </ul>

              <div className="text-center">
                <Button
                  href={`${process.env.NEXTAUTH_URL}/dashboard`}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg inline-block no-underline"
                >
                  🌌 Criar Primeira Carta
                </Button>
              </div>
            </Section>

            <Section className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20 mb-6">
              <Text className="text-purple-300 text-sm">
                <strong>💡 Dica:</strong> Cada carta cósmica custa apenas R$
                5,99 e permite que você envie mensagens que só serão reveladas
                no momento perfeito!
              </Text>
            </Section>

            <Section className="text-center mt-8 pt-6 border-t border-purple-500/30">
              <Text className="text-purple-400 text-xs">
                © 2024 Cartas Cósmicas • Feito com ❤️ para conectar corações
                através do universo
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
