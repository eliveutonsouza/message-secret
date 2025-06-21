import { CosmicAvatar } from "@/components/ui/cosmic-avatar";
import { UserDropdown } from "./user-dropdown";
import type { User } from "next-auth";

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold cosmic-text-glow">
          Suas Cartas Cósmicas
        </h1>
        <p className="text-purple-200 mt-2">
          Bem-vindo de volta, {user.name || user.email}
        </p>
      </div>

      <UserDropdown
        user={user}
        avatar={
          <CosmicAvatar
            src={user.image || undefined}
            fallback={getUserInitials(user.name, user.email)}
            className="h-8 w-8"
          />
        }
      />
    </div>
  );
}
