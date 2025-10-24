"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageSquare, Flag, Send } from "lucide-react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CommunityPost, CommunityReply } from "@/lib/firestore-types";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPost();
  }, [params.id]);

  const loadPost = async () => {
    try {
      const postRef = doc(db, "community", params.id as string);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPost({ id: postSnap.id, ...postSnap.data() } as CommunityPost);
      }
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user || !post) return;

    try {
      const postRef = doc(db, "community", post.id);
      const hasLiked = post.likes.includes(user.uid);

      if (hasLiked) {
        const updatedLikes = post.likes.filter((id) => id !== user.uid);
        await updateDoc(postRef, { likes: updatedLikes });
        setPost({ ...post, likes: updatedLikes });
      } else {
        await updateDoc(postRef, { likes: arrayUnion(user.uid) });
        setPost({ ...post, likes: [...post.likes, user.uid] });
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'aimer ce post",
        variant: "destructive",
      });
    }
  };

  const handleReply = async () => {
    if (!user || !post || !replyContent.trim()) return;

    setSubmitting(true);
    try {
      const newReply: CommunityReply = {
        id: Date.now().toString(),
        authorId: user.uid,
        authorName: userProfile?.displayName || user.email || "Anonyme",
        content: replyContent.trim(),
        likes: [],
        createdAt: new Date(),
      };

      const postRef = doc(db, "community", post.id);
      await updateDoc(postRef, { replies: arrayUnion(newReply) });

      setPost({ ...post, replies: [...post.replies, newReply] });
      setReplyContent("");

      toast({
        title: "Succès",
        description: "Votre réponse a été publiée",
      });
    } catch (error) {
      console.error("Error replying:", error);
      toast({
        title: "Erreur",
        description: "Impossible de publier votre réponse",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReport = async () => {
    if (!user || !post) return;

    try {
      const postRef = doc(db, "community", post.id);
      await updateDoc(postRef, {
        reports: arrayUnion({
          userId: user.uid,
          reason: "Contenu inapproprié",
          reportedAt: new Date(),
        }),
      });

      toast({
        title: "Signalement envoyé",
        description: "Merci, nous examinerons ce contenu",
      });
    } catch (error) {
      console.error("Error reporting post:", error);
      toast({
        title: "Erreur",
        description: "Impossible de signaler ce post",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-64 mb-8" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Question non trouvée</h1>
        <Button onClick={() => router.push("/community")}>
          Retour à la communauté
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Post Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Par {post.authorName}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleReport}>
                <Flag className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-wrap mb-6">
              {post.content}
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                disabled={!user}
              >
                <ThumbsUp
                  className={`h-4 w-4 mr-2 ${
                    user && post.likes.includes(user.uid) ? "fill-current" : ""
                  }`}
                />
                {post.likes.length} J'aime
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                {post.replies.length} réponses
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies Section */}
        <Card>
          <CardHeader>
            <CardTitle>{post.replies.length} Réponses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reply Form */}
            {user ? (
              <div className="space-y-4">
                <Textarea
                  placeholder="Écrivez votre réponse..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                />
                <Button
                  onClick={handleReply}
                  disabled={submitting || !replyContent.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitting ? "Publication..." : "Publier la réponse"}
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 bg-muted rounded-lg">
                <p className="text-muted-foreground mb-2">
                  Connectez-vous pour répondre
                </p>
                <Button onClick={() => router.push("/auth")}>
                  Se connecter
                </Button>
              </div>
            )}

            <Separator />

            {/* Replies List */}
            {post.replies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucune réponse pour le moment
              </div>
            ) : (
              <div className="space-y-4">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{reply.authorName}</span>
                        <span className="text-muted-foreground">
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {reply.likes.length}
                      </Button>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">
                      {reply.content}
                    </p>
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
