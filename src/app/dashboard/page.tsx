import { DashboardHeader } from "./dashboard-header"
import { DashboardStats } from "./dashboard-stats"
import { LettersGrid } from "./letters-grid"
import { CreateLetterButton } from "./create-letter-button"
import { LetterService } from "@/lib/services/letter-service"
import { requireAuth } from "@/lib/auth"

export default async function DashboardPage() {
  const user = await requireAuth()

  const [letters, stats] = await Promise.all([
    LetterService.getLettersByUserId(user.id!),
    LetterService.getLetterStats(user.id!),
  ])

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader user={user} />
        <DashboardStats stats={stats} />
        <CreateLetterButton />
        <LettersGrid letters={letters} />
      </div>
    </div>
  )
}
