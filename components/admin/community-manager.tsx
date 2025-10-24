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
import { Check, X, Flag } from "lucide-react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CommunityPost } from "@/lib/firestore-types";
import { useToast } from "@/hooks/use-toast";

export function CommunityManager() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const postsRef = collection(db, "community");
      const snapshot = await getDocs(postsRef);
      const postsData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as CommunityPost)
      );
      setPosts(postsData);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId: string) => {
    try {
      await updateDoc(doc(db, "community", postId), { status: "approved" });
      setPosts(
        posts.map((p) =>
          p.id === postId ? { ...p, status: "approved" as const } : p
        )
      );
      toast({
        title: "Succès",
        description: "Post approuvé",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'approuver le post",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await updateDoc(doc(db, "community", postId), { status: "rejected" });
      setPosts(
        posts.map((p) =>
          p.id === postId ? { ...p, status: "rejected" as const } : p
        )
      );
      toast({
        title: "Succès",
        description: "Post rejeté",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rejeter le post",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) return;

    try {
      await deleteDoc(doc(db, "community", postId));
      setPosts(posts.filter((p) => p.id !== postId));
      toast({
        title: "Succès",
        description: "Post supprimé",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le post",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modération Communauté</CardTitle>
        <CardDescription>
          Approuvez ou rejetez les posts de la communauté
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucun post trouvé
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Signalements</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.authorName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "approved"
                          ? "default"
                          : post.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.reports.length > 0 && (
                      <Badge variant="destructive">
                        <Flag className="h-3 w-3 mr-1" />
                        {post.reports.length}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {post.status !== "approved" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApprove(post.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {post.status !== "rejected" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReject(post.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
                      >
                        <X className="h-4 w-4 text-destructive" />
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
