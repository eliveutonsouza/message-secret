"use client";

import { CosmicCard, CardContent } from "@/components/ui/cosmic-card";
import { sendContactFormEmail } from "@/lib/actions/email";
import { contactFormSchema } from "@/lib/schemas";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values) {
    const result = await sendContactFormEmail(values);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Mensagem enviada com sucesso! 🚀");
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return (
      <CosmicCard>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-purple-200 mb-2">
            Mensagem Enviada!
          </h3>
          <p className="text-purple-300">
            Obrigado pelo contato! Responderemos em breve através do
            espaço-tempo.
          </p>
        </CardContent>
      </CosmicCard>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome *</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="subject"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto *</FormLabel>
              <FormControl>
                <Input placeholder="Como podemos ajudar?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte-nos mais sobre sua dúvida ou sugestão..."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormDescription>Mínimo de 10 caracteres</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Enviar Mensagem
        </Button>
      </form>
    </Form>
  );
}
