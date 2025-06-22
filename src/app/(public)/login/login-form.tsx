"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/schemas/auth";
import { signInWithEmail } from "@/lib/actions";
import { Mail, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      callbackUrl: callbackUrl || "/dashboard",
    },
  });

  async function onSubmit(values) {
    const result = await signInWithEmail(values);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Link mágico enviado! ✨", {
        description: "Verifique seu email para acessar sua conta cósmica.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input
          type="hidden"
          name="callbackUrl"
          value={callbackUrl || "/dashboard"}
        />

        <div className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-200 font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Cósmico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-gradient-to-r from-purple-950/50 via-pink-950/50 to-indigo-950/50 border-purple-500/30 text-white placeholder:text-purple-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 group"
        >
          <div className="relative">
            <Mail className="h-5 w-5 group-hover:animate-bounce" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span>Enviar Link Mágico</span>
          <Zap className="h-4 w-4 group-hover:animate-pulse" />
        </Button>

        <div className="text-center">
          <p className="text-purple-300 text-xs">
            ✨ Um link mágico será enviado para seu email ✨
          </p>
        </div>
      </form>
    </Form>
  );
}
