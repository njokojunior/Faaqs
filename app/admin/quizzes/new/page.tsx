"use client";

import type React from "react";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Quiz, QuizQuestion } from "@/lib/firestore-types";
import { useToast } from "@/hooks/use-toast";

export default function NewQuizPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    title: "",
    description: "",
    subject: "",
    programmeId: "",
    difficulty: "medium",
    timeLimit: 30,
    passingScore: 70,
    questions: [],
    isPublished: false,
  });

  if (!user || !isAdmin()) {
    router.push("/auth");
    return null;
  }

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      points: 1,
    };
    setQuiz({ ...quiz, questions: [...(quiz.questions || []), newQuestion] });
  };

  const updateQuestion = (
    index: number,
    field: keyof QuizQuestion,
    value: any
  ) => {
    const updatedQuestions = [...(quiz.questions || [])];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...(quiz.questions || [])];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex] = value;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options,
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions =
      quiz.questions?.filter((_, i) => i !== index) || [];
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !quiz.title ||
      !quiz.programmeId ||
      !quiz.questions ||
      quiz.questions.length === 0
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "quizzes"), {
        ...quiz,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast({
        title: "Succès",
        description: "Quiz créé avec succès",
      });

      router.push("/admin");
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le quiz",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Créer un nouveau quiz</CardTitle>
            <CardDescription>
              Ajoutez des questions pour tester les connaissances des étudiants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du quiz</Label>
                  <Input
                    id="title"
                    value={quiz.title}
                    onChange={(e) =>
                      setQuiz({ ...quiz, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="programmeId">ID du programme</Label>
                  <Input
                    id="programmeId"
                    value={quiz.programmeId}
                    onChange={(e) =>
                      setQuiz({ ...quiz, programmeId: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={quiz.description}
                  onChange={(e) =>
                    setQuiz({ ...quiz, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="subject">Matière</Label>
                  <Input
                    id="subject"
                    value={quiz.subject}
                    onChange={(e) =>
                      setQuiz({ ...quiz, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <Select
                    value={quiz.difficulty}
                    onValueChange={(value: any) =>
                      setQuiz({ ...quiz, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Facile</SelectItem>
                      <SelectItem value="medium">Moyen</SelectItem>
                      <SelectItem value="hard">Difficile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Temps (min)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={quiz.timeLimit}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        timeLimit: Number.parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Questions</Label>
                  <Button type="button" onClick={addQuestion} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une question
                  </Button>
                </div>

                {quiz.questions?.map((question, qIndex) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          Question {qIndex + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Textarea
                          value={question.question}
                          onChange={(e) =>
                            updateQuestion(qIndex, "question", e.target.value)
                          }
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Options de réponse</Label>
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) =>
                                updateOption(qIndex, oIndex, e.target.value)
                              }
                              placeholder={`Option ${oIndex + 1}`}
                            />
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={question.correctAnswer === oIndex}
                              onChange={() =>
                                updateQuestion(qIndex, "correctAnswer", oIndex)
                              }
                              className="h-4 w-4"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label>Explication</Label>
                        <Textarea
                          value={question.explanation}
                          onChange={(e) =>
                            updateQuestion(
                              qIndex,
                              "explanation",
                              e.target.value
                            )
                          }
                          rows={2}
                          placeholder="Explication de la bonne réponse"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? "Création..." : "Créer le quiz"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
