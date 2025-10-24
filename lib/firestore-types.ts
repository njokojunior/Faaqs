// Firestore data types and interfaces

export type UserRole = "student" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  role: UserRole;
  subscription: {
    plan: "free" | "1-month" | "6-months" | "12-months" | "2-years";
    status: "active" | "expired" | "cancelled";
    startDate: Date;
    endDate: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Programme {
  id: string;
  title: string;
  slug: string;
  acronym: string;
  category: string;
  description: string;
  examSubjects: string[];
  examOrganization: {
    writtenExams: string;
    practicalExams: string;
    thesis: string;
  };
  resources: {
    revisionSheets: number;
    quizzes: number;
    pastPapers: number;
  };
  heroImage: string;
  icon: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  id: string;
  programmeId: string;
  title: string;
  description: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  points: number;
}

export interface UserProgress {
  userId: string;
  programmeId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  completedAt: Date;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  programmeId: string | null;
  title: string;
  content: string;
  tags: string[];
  status: "pending" | "approved" | "rejected" | "reported";
  replies: CommunityReply[];
  likes: string[]; // array of user IDs
  reports: {
    userId: string;
    reason: string;
    reportedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityReply {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  likes: string[];
  createdAt: Date;
}

export interface UploadedFile {
  id: string;
  programmeId: string;
  type: "pdf" | "image";
  category: "revision-sheet" | "past-paper" | "methodology" | "other";
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
}
