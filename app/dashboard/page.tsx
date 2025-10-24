"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Trophy, BookOpen, Clock, TrendingUp } from "lucide-react";
import { getUserProgress } from "@/lib/firestore-helpers";
import type { UserProgress } from "@/lib/firestore-types";
import Link from "next/link";

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
      return;
    }
    if (user) {
      loadProgress();
    }
  }, [user, loading]);

  const loadProgress = async () => {
    if (!user) return;
    try {
      const userProgress = await getUserProgress(user.uid);
      setProgress(userProgress);
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoadingProgress(false);
    }
  };

  const calculateStats = () => {
    if (progress.length === 0)
      return { avgScore: 0, totalQuizzes: 0, totalTime: 0 };
    const avgScore = Math.round(
      progress.reduce((sum, p) => sum + p.score, 0) / progress.length
    );
    const totalQuizzes = progress.length;
    const totalTime = Math.round(
      progress.reduce((sum, p) => sum + p.timeSpent, 0) / 60
    );
    return { avgScore, totalQuizzes, totalTime };
  };

  if (loading || loadingProgress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mon Tableau de Bord</h1>
          <p className="text-muted-foreground">
            Bienvenue, {userProfile?.displayName || user?.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}%</div>
              <Progress value={stats.avgScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quiz Complétés
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Total terminés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temps d'Étude
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTime} min</div>
              <p className="text-xs text-muted-foreground mt-2">Temps total</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Quiz</CardTitle>
            <CardDescription>Vos derniers quiz complétés</CardDescription>
          </CardHeader>
          <CardContent>
            {progress.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore complété de quiz
                </p>
                <Link href="/quizzes">
                  <Button>Commencer un quiz</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {progress.slice(0, 10).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        Quiz #{item.quizId.slice(0, 8)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.correctAnswers} / {item.totalQuestions} correctes
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">{item.score}%</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round(item.timeSpent / 60)} min
                        </p>
                      </div>
                      <TrendingUp
                        className={`h-5 w-5 ${
                          item.score >= 70
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
