"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Users, BookOpen, MessageSquare, FileText } from "lucide-react";
import { QuizzesManager } from "@/components/admin/quizzes-manager";
import { UsersManager } from "@/components/admin/users-manager";
import { CommunityManager } from "@/components/admin/community-manager";
import { FilesManager } from "@/components/admin/files-manager";

export default function AdminDashboard() {
  const { user, userProfile, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalQuizzes: 0,
    pendingPosts: 0,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin())) {
      router.push("/auth");
    }
  }, [user, userProfile, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!user || !isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>
            <p className="text-muted-foreground">
              Gérez votre plateforme FAAQS
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Total inscrits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abonnements</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.activeSubscriptions}
              </div>
              <p className="text-xs text-muted-foreground">Actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
              <p className="text-xs text-muted-foreground">Publiés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPosts}</div>
              <p className="text-xs text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="quizzes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="quizzes">Quiz</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="community">Communauté</TabsTrigger>
            <TabsTrigger value="files">Fichiers</TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes" className="space-y-4">
            <QuizzesManager />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <UsersManager />
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <CommunityManager />
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <FilesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
