"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  CosmicDropdownMenuContent,
  CosmicDropdownMenuItem,
  CosmicDropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/cosmic-dropdown";
import { signOutAction } from "@/lib/actions";
import { LogOut, Settings } from "lucide-react";
import type { User as NextAuthUser } from "next-auth";
import { toast } from "sonner";
import Link from "next/link";

interface UserDropdownProps {
  user: NextAuthUser;
  avatar: React.ReactNode;
}

export function UserDropdown({ user, avatar }: UserDropdownProps) {
  async function handleSignOut() {
    const result = await signOutAction();

    if (result?.error) {
      toast.error(result.error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-purple-300 hover:bg-transparent hover:text-purple-200"
        >
          {avatar}
          <span className="hidden md:inline ml-2">
            {user.name || user.email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <CosmicDropdownMenuContent align="end">
        <CosmicDropdownMenuLabel>Minha Conta</CosmicDropdownMenuLabel>
        <DropdownMenuSeparator />
        <CosmicDropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </CosmicDropdownMenuItem>
        <DropdownMenuSeparator />
        <CosmicDropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </CosmicDropdownMenuItem>
      </CosmicDropdownMenuContent>
    </DropdownMenu>
  );
}
