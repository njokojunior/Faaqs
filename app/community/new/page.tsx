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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { createCommunityPost } from "@/lib/firestore-helpers";
import { useToast } from "@/hooks/use-toast";

export default function NewPostPage() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    router.push("/auth");
    return null;
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await createCommunityPost({
        authorId: user.uid,
        authorName: userProfile?.displayName || user.email || "Anonyme",
        authorEmail: user.email || "",
        programmeId: null,
        title: title.trim(),
        content: content.trim(),
        tags,
        replies: [],
        likes: [],
        reports: [],
      });

      toast({
        title: "Succès",
        description: "Votre question a été publiée",
      });

      router.push("/community");
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Erreur",
        description: "Impossible de publier votre question",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Poser une question</CardTitle>
            <CardDescription>
              Partagez votre question avec la communauté FAAQS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la question</Label>
                <Input
                  id="title"
                  placeholder="Ex: Comment réviser efficacement pour l'examen de physiologie ?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  {title.length}/200 caractères
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Description détaillée</Label>
                <Textarea
                  id="content"
                  placeholder="Décrivez votre question en détail..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  maxLength={2000}
                />
                <p className="text-xs text-muted-foreground">
                  {content.length}/2000 caractères
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (optionnel)</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Ajouter un tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="outline"
                  >
                    Ajouter
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Maximum 5 tags</p>
              </div>

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
                  {submitting ? "Publication..." : "Publier la question"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
