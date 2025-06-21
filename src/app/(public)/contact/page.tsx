import { ContactForm } from "@/components/forms";
import { CosmicCard, CardContent } from "@/components/ui/cosmic-card";
import { Mail, MessageCircle, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold cosmic-text-glow mb-4">
              Fale Conosco
            </h1>
            <p className="text-purple-200 text-lg">
              Tem dúvidas sobre sua jornada cósmica? Estamos aqui para ajudar!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <CosmicCard className="text-center">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-200 mb-2">
                  Email
                </h3>
                <p className="text-purple-300 text-sm">
                  contato@cartascosmicas.com
                </p>
              </CardContent>
            </CosmicCard>

            <CosmicCard className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-200 mb-2">
                  Suporte
                </h3>
                <p className="text-purple-300 text-sm">Resposta em até 24h</p>
              </CardContent>
            </CosmicCard>

            <CosmicCard className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-200 mb-2">
                  Horário
                </h3>
                <p className="text-purple-300 text-sm">
                  24/7 através do cosmos
                </p>
              </CardContent>
            </CosmicCard>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
