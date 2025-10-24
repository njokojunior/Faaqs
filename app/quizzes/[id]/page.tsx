"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { saveQuizProgress } from "@/lib/firestore-helpers";
import type { Quiz } from "@/lib/firestore-types";
import { useToast } from "@/hooks/use-toast";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    loadQuiz();
  }, [user]);

  useEffect(() => {
    if (quiz && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quiz, timeLeft]);

  const loadQuiz = async () => {
    try {
      const quizRef = doc(db, "quizzes", params.id as string);
      const quizSnap = await getDoc(quizRef);
      if (quizSnap.exists()) {
        const quizData = { id: quizSnap.id, ...quizSnap.data() } as Quiz;
        setQuiz(quizData);
        setTimeLeft(quizData.timeLimit * 60);
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le quiz",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !user) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const results = quiz.questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: answers[q.id] ?? -1,
      isCorrect: answers[q.id] === q.correctAnswer,
    }));

    const correctAnswers = results.filter((r) => r.isCorrect).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    try {
      await saveQuizProgress(user.uid, {
        programmeId: quiz.programmeId,
        quizId: quiz.id,
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        timeSpent,
        answers: results,
      });

      setShowResults(true);
    } catch (error) {
      console.error("Error saving progress:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder vos résultats",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz non trouvé</h1>
        <Button onClick={() => router.push("/quizzes")}>Retour aux quiz</Button>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = quiz.questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                {passed ? (
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <CardTitle className="text-3xl">
                {passed ? "Félicitations !" : "Continuez vos efforts !"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{score}%</div>
                <p className="text-muted-foreground">
                  {correctAnswers} / {quiz.questions.length} réponses correctes
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Détails des réponses</h3>
                {quiz.questions.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Question {index + 1}: {question.question}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Votre réponse:{" "}
                            {userAnswer !== undefined
                              ? question.options[userAnswer]
                              : "Non répondu"}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600">
                              Bonne réponse:{" "}
                              {question.options[question.correctAnswer]}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => router.push("/quizzes")}
                  variant="outline"
                  className="flex-1"
                >
                  Retour aux quiz
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  Recommencer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} sur {quiz.questions.length}
          </p>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) =>
                handleAnswerSelect(question.id, Number.parseInt(value))
              }
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent/50 cursor-pointer"
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
              {currentQuestion === quiz.questions.length - 1 ? (
                <Button onClick={handleSubmit} className="flex-1">
                  Terminer
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1">
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
