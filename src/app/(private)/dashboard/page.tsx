import { Suspense } from "react";
import { LetterCard } from "./components/letter-card";
import { EmptyState } from "./components/empty-state";
import { CreateLetterButton } from "./components/create-letter-button";
import { Star } from "lucide-react";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardStats } from "./components/dashboard-stats";
import { LetterService } from "@/lib/services/letter-service";
import { requireAuth } from "@/lib/auth";
import { LetterCardSkeleton } from "./components/letter-card-skeleton";

export default async function DashboardPage() {
  const user = await requireAuth();
  const [letters, stats] = await Promise.all([
    LetterService.getLettersByUserId(user.id!),
    LetterService.getLetterStats(user.id!),
  ]);

  const favoriteLetters = letters.filter((letter) => letter.isFavorite);
  const otherLetters = letters.filter((letter) => !letter.isFavorite);

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader user={user} />
        <DashboardStats stats={stats} />

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <CreateLetterButton />
        </div>

        {letters.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-8">
            {favoriteLetters.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <h2 className="text-xl font-semibold">Cartas Favoritas</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Suspense fallback={<LetterCardSkeleton />}>
                    {favoriteLetters.map((letter) => (
                      <LetterCard key={letter.id} letter={letter} />
                    ))}
                  </Suspense>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-4">Todas as Cartas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<LetterCardSkeleton />}>
                  {otherLetters.map((letter) => (
                    <LetterCard key={letter.id} letter={letter} />
                  ))}
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
