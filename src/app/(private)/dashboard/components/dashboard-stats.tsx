import { CosmicCard, CardContent, CardHeader, CardTitle } from "@/components/ui/cosmic-card"
import { Heart, Clock, CheckCircle, XCircle } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    total: number
    pending: number
    paid: number
    failed: number
    favorites: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <CosmicCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-purple-300">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-200">{stats.total}</div>
        </CardContent>
      </CosmicCard>

      <CosmicCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-purple-300">Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            <span className="text-2xl font-bold text-purple-200">{stats.pending}</span>
          </div>
        </CardContent>
      </CosmicCard>

      <CosmicCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-purple-300">Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-2xl font-bold text-purple-200">{stats.paid}</span>
          </div>
        </CardContent>
      </CosmicCard>

      <CosmicCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-purple-300">Falharam</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-400" />
            <span className="text-2xl font-bold text-purple-200">{stats.failed}</span>
          </div>
        </CardContent>
      </CosmicCard>

      <CosmicCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-purple-300">Favoritas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-2xl font-bold text-purple-200">{stats.favorites}</span>
          </div>
        </CardContent>
      </CosmicCard>
    </div>
  )
}
