"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, Target, Play } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Quiz } from "@/lib/firestore-types";
import Link from "next/link";

export default function QuizzesPage() {
  const { user, userProfile } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const quizzesRef = collection(db, "quizzes");
      const q = query(quizzesRef, where("isPublished", "==", true));
      const snapshot = await getDocs(q);
      const quizzesData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Quiz)
      );
      setQuizzes(quizzesData);
    } catch (error) {
      console.error("Error loading quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Quiz d'Entraînement
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto opacity-90">
            Testez vos connaissances et suivez votre progression
          </p>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Aucun quiz disponible
            </h2>
            <p className="text-muted-foreground">
              Les quiz seront bientôt disponibles
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="outline">{quiz.subject}</Badge>
                  </div>
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {quiz.questions.length} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.timeLimit} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {quiz.passingScore}%
                    </div>
                  </div>
                  <Link href={user ? `/quizzes/${quiz.id}` : "/auth"}>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      {user ? "Commencer le quiz" : "Connexion requise"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
