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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, ThumbsUp, Plus, Search } from "lucide-react";
import { getCommunityPosts } from "@/lib/firestore-helpers";
import type { CommunityPost } from "@/lib/firestore-types";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Header } from "@/components/header";

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const communityPosts = await getCommunityPosts();
      setPosts(communityPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
 
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Communauté FAAQS
            </h1>
            <p className="text-xl text-center max-w-2xl mx-auto opacity-90">
              Posez vos questions, partagez vos connaissances et aidez vos
              camarades
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Link href={user ? "/community/new" : "/auth"}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Poser une question
              </Button>
            </Link>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">
                  Aucune question trouvée
                </h2>
                <p className="text-muted-foreground mb-4">
                  Soyez le premier à poser une question
                </p>
                <Link href={user ? "/community/new" : "/auth"}>
                  <Button>Poser une question</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/community/${post.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {post.content}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="secondary">
                            {post.replies.length} réponses
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes.length}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Par {post.authorName} •{" "}
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}
