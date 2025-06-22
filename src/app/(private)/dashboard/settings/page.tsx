import { SettingsClient } from "./settings-client";
import { requireAuth } from "@/lib/auth";
import { UserService } from "@/lib/services/user-service";

export default async function SettingsPage() {
  const user = await requireAuth();
  const userData = await UserService.getUserById(user.id!);

  return <SettingsClient user={userData} />;
}
