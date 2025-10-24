"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Quiz } from "@/lib/firestore-types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export function QuizzesManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const quizzesRef = collection(db, "quizzes");
      const snapshot = await getDocs(quizzesRef);
      const quizzesData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Quiz)
      );
      setQuizzes(quizzesData);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les quiz",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce quiz ?")) return;

    try {
      await deleteDoc(doc(db, "quizzes", quizId));
      setQuizzes(quizzes.filter((q) => q.id !== quizId));
      toast({
        title: "Succès",
        description: "Quiz supprimé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le quiz",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestion des Quiz</CardTitle>
            <CardDescription>
              Créez et gérez les quiz pour chaque programme
            </CardDescription>
          </div>
          <Link href="/admin/quizzes/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Quiz
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucun quiz trouvé
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Programme</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Difficulté</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.subject}</TableCell>
                  <TableCell>{quiz.questions.length}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        quiz.difficulty === "hard" ? "destructive" : "secondary"
                      }
                    >
                      {quiz.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={quiz.isPublished ? "default" : "outline"}>
                      {quiz.isPublished ? "Publié" : "Brouillon"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(quiz.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
