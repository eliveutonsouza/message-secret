"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LargeDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface LargeDialogTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface LargeDialogContentProps {
  className?: string;
  children: React.ReactNode;
}

interface LargeDialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface LargeDialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

function LargeDialog({ open, onOpenChange, children }: LargeDialogProps) {
  const [isOpen, setIsOpen] = React.useState(open || false);

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => handleOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

function LargeDialogTrigger({ children, onClick }: LargeDialogTriggerProps) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}

function LargeDialogContent({ className, children }: LargeDialogContentProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-purple-950 via-purple-900 to-blue-950 border border-purple-800 rounded-lg shadow-xl p-6 max-w-6xl w-full mx-4 max-h-[95vh] overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

function LargeDialogHeader({ className, children }: LargeDialogHeaderProps) {
  return <div className={cn("mb-6", className)}>{children}</div>;
}

function LargeDialogTitle({ className, children }: LargeDialogTitleProps) {
  return (
    <h2 className={cn("text-2xl font-bold text-white", className)}>
      {children}
    </h2>
  );
}

export {
  LargeDialog,
  LargeDialogTrigger,
  LargeDialogContent,
  LargeDialogHeader,
  LargeDialogTitle,
};
