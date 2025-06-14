"use client";

import { Toaster } from "sonner";

export function SonnerProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgb(15 23 42 / 0.95)",
          border: "1px solid rgb(147 51 234 / 0.3)",
          color: "rgb(196 181 253)",
          backdropFilter: "blur(8px)",
        },
      }}
      theme="dark"
    />
  );
}
