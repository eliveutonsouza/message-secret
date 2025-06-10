"use server"

import { Resend } from "resend"
import { render } from "@react-email/render"
import { magicLinkEmailSchema, letterNotificationEmailSchema, welcomeEmailSchema } from "@/lib/schemas"

// Email Templates
import { MagicLinkEmail } from "@/emails/magic-link"
import { LetterNotificationEmail } from "@/emails/letter-notification"
import { WelcomeEmail } from "@/emails/welcome"
import { PaymentConfirmationEmail } from "@/emails/payment-confirmation"
import { ContactFormEmail } from "@/emails/contact-form"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMagicLinkEmail(data: any) {
  try {
    const validatedData = magicLinkEmailSchema.parse(data)

    const emailHtml = await render(
      MagicLinkEmail({
        url: validatedData.url,
        host: validatedData.host,
      }),
    )

    const result = await resend.emails.send({
      from: "Cartas Cósmicas <noreply@cartascosmicas.com>",
      to: validatedData.email,
      subject: "🌟 Seu link mágico chegou!",
      html: emailHtml,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error("Erro ao enviar magic link:", error)
    return { error: "Erro ao enviar email" }
  }
}

export async function sendLetterNotificationEmail(data: any) {
  try {
    const validatedData = letterNotificationEmailSchema.parse(data)

    const emailHtml = await render(
      LetterNotificationEmail({
        letterTitle: validatedData.letterTitle,
        letterUrl: validatedData.letterUrl,
        senderName: validatedData.senderName,
        releaseDate: validatedData.releaseDate,
      }),
    )

    const result = await resend.emails.send({
      from: "Cartas Cósmicas <noreply@cartascosmicas.com>",
      to: validatedData.recipientEmail,
      subject: `💌 Uma carta cósmica chegou para você!`,
      html: emailHtml,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error("Erro ao enviar notificação de carta:", error)
    return { error: "Erro ao enviar email" }
  }
}

export async function sendWelcomeEmail(data: any) {
  try {
    const validatedData = welcomeEmailSchema.parse(data)

    const emailHtml = await render(
      WelcomeEmail({
        name: validatedData.name,
      }),
    )

    const result = await resend.emails.send({
      from: "Cartas Cósmicas <welcome@cartascosmicas.com>",
      to: validatedData.email,
      subject: "🚀 Bem-vindo à jornada cósmica!",
      html: emailHtml,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error("Erro ao enviar email de boas-vindas:", error)
    return { error: "Erro ao enviar email" }
  }
}

export async function sendPaymentConfirmationEmail(data: any) {
  try {
    const emailHtml = await render(
      PaymentConfirmationEmail({
        letterTitle: data.letterTitle,
        amount: data.amount,
        paymentId: data.paymentId,
        letterUrl: data.letterUrl,
      }),
    )

    const result = await resend.emails.send({
      from: "Cartas Cósmicas <payments@cartascosmicas.com>",
      to: data.email,
      subject: "✅ Pagamento confirmado - Sua carta está ativa!",
      html: emailHtml,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error("Erro ao enviar confirmação de pagamento:", error)
    return { error: "Erro ao enviar email" }
  }
}

export async function sendContactFormEmail(data: any) {
  try {
    const emailHtml = await render(
      ContactFormEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
    )

    const result = await resend.emails.send({
      from: "Cartas Cósmicas <contact@cartascosmicas.com>",
      to: "suporte@cartascosmicas.com",
      subject: `📧 Novo contato: ${data.subject}`,
      html: emailHtml,
      replyTo: data.email,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error("Erro ao enviar formulário de contato:", error)
    return { error: "Erro ao enviar email" }
  }
}

export async function sendBulkEmail(emails: string[], subject: string, template: string, data: any) {
  try {
    const results = await Promise.allSettled(
      emails.map(async (email) => {
        return await resend.emails.send({
          from: "Cartas Cósmicas <noreply@cartascosmicas.com>",
          to: email,
          subject,
          html: template,
        })
      }),
    )

    const successful = results.filter((result) => result.status === "fulfilled").length
    const failed = results.filter((result) => result.status === "rejected").length

    return { success: true, sent: successful, failed }
  } catch (error) {
    console.error("Erro ao enviar emails em lote:", error)
    return { error: "Erro ao enviar emails" }
  }
}
