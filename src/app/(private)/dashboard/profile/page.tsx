import { ProfileClient } from "./profile-client";
import { requireAuth } from "@/lib/auth";
import { UserService } from "@/lib/services/user-service";

export default async function ProfilePage() {
  const user = await requireAuth();
  const userData = await UserService.getUserById(user.id!);

  return <ProfileClient user={userData} />;
}
