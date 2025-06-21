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
import { Mail } from "lucide-react";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="hidden"
          name="callbackUrl"
          value={callbackUrl || "/dashboard"}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Cósmico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Enviar Link Mágico
        </Button>
      </form>
    </Form>
  );
}
