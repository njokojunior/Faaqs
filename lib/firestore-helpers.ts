import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  type QueryConstraint,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  UserProfile,
  Programme,
  Quiz,
  UserProgress,
  CommunityPost,
} from "./firestore-types";

// User operations
export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string | null
) {
  const userRef = doc(db, "users", uid);
  const userData: Partial<UserProfile> = {
    uid,
    email,
    displayName,
    role: "student",
    subscription: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await setDoc(userRef, userData);
  return userData;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? (userSnap.data() as UserProfile) : null;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { ...data, updatedAt: serverTimestamp() });
}

export async function isUserAdmin(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  return profile?.role === "admin";
}

// Programme operations
export async function getProgrammes(): Promise<Programme[]> {
  const programmesRef = collection(db, "programmes");
  const q = query(
    programmesRef,
    where("isPublished", "==", true),
    orderBy("title")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Programme)
  );
}

export async function getProgrammeBySlug(
  slug: string
): Promise<Programme | null> {
  const programmesRef = collection(db, "programmes");
  const q = query(programmesRef, where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  return snapshot.empty
    ? null
    : ({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Programme);
}

// Quiz operations
export async function getQuizzesByProgramme(
  programmeId: string
): Promise<Quiz[]> {
  const quizzesRef = collection(db, "quizzes");
  const q = query(
    quizzesRef,
    where("programmeId", "==", programmeId),
    where("isPublished", "==", true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Quiz));
}

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  const quizRef = doc(db, "quizzes", quizId);
  const quizSnap = await getDoc(quizRef);
  return quizSnap.exists()
    ? ({ id: quizSnap.id, ...quizSnap.data() } as Quiz)
    : null;
}

// User progress operations
export async function saveQuizProgress(
  userId: string,
  progress: Omit<UserProgress, "userId">
) {
  const progressRef = collection(db, "users", userId, "progress");
  await addDoc(progressRef, {
    ...progress,
    userId,
    completedAt: serverTimestamp(),
  });
}

export async function getUserProgress(
  userId: string,
  programmeId?: string
): Promise<UserProgress[]> {
  const progressRef = collection(db, "users", userId, "progress");
  const constraints: QueryConstraint[] = [orderBy("completedAt", "desc")];
  if (programmeId) {
    constraints.unshift(where("programmeId", "==", programmeId));
  }
  const q = query(progressRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as unknown as UserProgress)
  );
}

// Community operations
export async function createCommunityPost(
  post: Omit<CommunityPost, "id" | "createdAt" | "updatedAt" | "status">
) {
  const postsRef = collection(db, "community");
  const docRef = await addDoc(postsRef, {
    ...post,
    status: "approved", // Auto-approve for now, can add moderation later
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getCommunityPosts(
  programmeId?: string
): Promise<CommunityPost[]> {
  const postsRef = collection(db, "community");
  const constraints: QueryConstraint[] = [
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    limit(50),
  ];
  if (programmeId) {
    constraints.unshift(where("programmeId", "==", programmeId));
  }
  const q = query(postsRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as CommunityPost)
  );
}

export async function updateCommunityPost(
  postId: string,
  data: Partial<CommunityPost>
) {
  const postRef = doc(db, "community", postId);
  await updateDoc(postRef, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteCommunityPost(postId: string) {
  const postRef = doc(db, "community", postId);
  await deleteDoc(postRef);
}
