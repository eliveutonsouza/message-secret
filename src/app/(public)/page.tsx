import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { Heart, Clock, Star, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 cosmic-text-glow">
            Envie uma carta que
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {" "}
              ultrapassa o tempo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 leading-relaxed">
            Crie mensagens misteriosas que só poderão ser lidas na data
            escolhida por você. Porque o amor verdadeiro transcende o
            espaço-tempo.
          </p>
          <Link href="/login">
            <CosmicButton size="lg" className="text-lg px-8 py-4">
              <Sparkles className="mr-2 h-5 w-5" />
              Começar Jornada Cósmica
            </CosmicButton>
          </Link>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 cosmic-text-glow">
          Como Funciona a Magia
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <CosmicCard className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-purple-200">
                1. Escreva com o Coração
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300">
                Redige sua mensagem especial e escolha a data perfeita para
                revelá-la
              </p>
            </CardContent>
          </CosmicCard>

          <CosmicCard className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-purple-200">
                2. Gere o Link Misterioso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300">
                Por apenas R$ 5,99, sua carta ganha vida e um link único é
                criado
              </p>
            </CardContent>
          </CosmicCard>

          <CosmicCard className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-purple-200">
                3. Aguarde o Momento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300">
                Compartilhe o link e deixe a expectativa crescer até o dia da
                revelação
              </p>
            </CardContent>
          </CosmicCard>
        </div>
      </section>

      {/* Depoimentos Inspiradores */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 cosmic-text-glow">
          Mensagens que Tocam Almas
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <CosmicCard>
            <CardContent className="p-6">
              <p className="text-purple-200 italic text-lg mb-4">
                "O amor não conhece distância nem tempo. Ele simplesmente é,
                como as estrelas que brilham há milhões de anos."
              </p>
              <p className="text-purple-400 text-sm">
                — Carta enviada para o futuro
              </p>
            </CardContent>
          </CosmicCard>

          <CosmicCard>
            <CardContent className="p-6">
              <p className="text-purple-200 italic text-lg mb-4">
                "Cada palavra escrita com amor se torna uma constelação no
                universo de quem a recebe."
              </p>
              <p className="text-purple-400 text-sm">
                — Mensagem cósmica anônima
              </p>
            </CardContent>
          </CosmicCard>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20 text-center">
        <CosmicCard className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 cosmic-text-glow">
              Pronto para Enviar Amor Através do Tempo?
            </h3>
            <p className="text-purple-200 mb-6 text-lg">
              Crie sua primeira carta cósmica por apenas R$ 5,99
            </p>
            <Link href="/login">
              <CosmicButton size="lg" className="text-lg px-8 py-4">
                <Sparkles className="mr-2 h-5 w-5" />
                Iniciar Jornada
              </CosmicButton>
            </Link>
          </CardContent>
        </CosmicCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-300">
            © 2024 Cartas Cósmicas. Feito com ❤️ para conectar corações através
            do universo.
          </p>
        </div>
      </footer>
    </div>
  );
}
