"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, ImageIcon } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export function FilesManager() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [programmeId, setProgrammeId] = useState("");
  const [category, setCategory] = useState<
    "revision-sheet" | "past-paper" | "methodology" | "other"
  >("revision-sheet");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !programmeId || !title) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload file to Storage
      const fileRef = ref(
        storage,
        `programmes/${programmeId}/${category}/${file.name}`
      );
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      // Save metadata to Firestore
      await addDoc(collection(db, "files"), {
        programmeId,
        type: file.type.includes("pdf") ? "pdf" : "image",
        category,
        title,
        description,
        fileName: file.name,
        fileUrl,
        fileSize: file.size,
        uploadedBy: "admin", // Should be current user ID
        uploadedAt: new Date(),
      });

      toast({
        title: "Succès",
        description: "Fichier uploadé avec succès",
      });

      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'uploader le fichier",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Fichiers</CardTitle>
        <CardDescription>
          Uploadez des PDFs et images pour les programmes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="programme">Programme</Label>
          <Input
            id="programme"
            placeholder="ID du programme"
            value={programmeId}
            onChange={(e) => setProgrammeId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select
            value={category}
            onValueChange={(value: any) => setCategory(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revision-sheet">Fiche de révision</SelectItem>
              <SelectItem value="past-paper">Annale</SelectItem>
              <SelectItem value="methodology">Méthodologie</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            placeholder="Titre du fichier"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Description (optionnel)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Fichier</Label>
          <Input
            id="file"
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
          />
          {file && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {file.type.includes("pdf") ? (
                <FileText className="h-4 w-4" />
              ) : (
                <ImageIcon className="h-4 w-4" />
              )}
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        <Button onClick={handleUpload} disabled={uploading} className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Upload en cours..." : "Uploader le fichier"}
        </Button>
      </CardContent>
    </Card>
  );
}
