"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFormStatus } from "react-dom"

interface CosmicFormFieldProps {
  children: React.ReactNode
  className?: string
}

export function CosmicFormField({ children, className }: CosmicFormFieldProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

interface CosmicLabelProps extends React.ComponentProps<typeof Label> {}

export function CosmicLabel({ className, ...props }: CosmicLabelProps) {
  return <Label className={cn("text-purple-200 font-medium", className)} {...props} />
}

interface CosmicInputProps extends React.ComponentProps<typeof Input> {}

export function CosmicInput({ className, ...props }: CosmicInputProps) {
  const { pending } = useFormStatus()

  return (
    <Input
      className={cn(
        "bg-slate-800/50 border-purple-500/30 text-white placeholder:text-purple-300",
        "focus:border-purple-400 focus:ring-purple-400/20",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      disabled={pending || props.disabled}
      {...props}
    />
  )
}

interface CosmicTextareaProps extends React.ComponentProps<typeof Textarea> {}

export function CosmicTextarea({ className, ...props }: CosmicTextareaProps) {
  const { pending } = useFormStatus()

  return (
    <Textarea
      className={cn(
        "bg-slate-800/50 border-purple-500/30 text-white placeholder:text-purple-300",
        "focus:border-purple-400 focus:ring-purple-400/20",
        "transition-all duration-200 resize-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      disabled={pending || props.disabled}
      {...props}
    />
  )
}

interface CosmicSubmitButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode
  loadingText?: string
}

export function CosmicSubmitButton({
  children,
  loadingText = "Carregando...",
  className,
  ...props
}: CosmicSubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={cn(
        "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
        "text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-purple-500/25",
        "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2",
        className,
      )}
      disabled={pending || props.disabled}
      {...props}
    >
      {pending ? loadingText : children}
    </button>
  )
}

interface CosmicFormErrorProps {
  children: React.ReactNode
}

export function CosmicFormError({ children }: CosmicFormErrorProps) {
  return <p className="text-red-400 text-sm font-medium">{children}</p>
}

interface CosmicFormDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function CosmicFormDescription({ children, className }: CosmicFormDescriptionProps) {
  return <p className={cn("text-purple-400 text-sm", className)}>{children}</p>
}
