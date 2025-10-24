"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { createUserProfile, getUserProfile } from "./firestore-helpers";
import type { UserProfile } from "./firestore-types";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          // wait briefly to ensure Firestore is online after Google popup
          await new Promise((r) => setTimeout(r, 300));

          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error: any) {
          console.warn("Error fetching user profile:", error);

          // 🔐 Handle "client is offline" gracefully instead of crashing
          if (
            error.code === "unavailable" ||
            error.message?.includes("offline")
          ) {
            console.log("Firestore client is offline, retrying...");
            setTimeout(async () => {
              try {
                const profile = await getUserProfile(user.uid);
                setUserProfile(profile);
              } catch (retryErr) {
                console.warn("Retry failed:", retryErr);
              }
            }, 1000);
          } else {
            // other errors — log but don't break the app
            console.error("Unexpected Firestore error:", error);
          }
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserProfile(
      userCredential.user.uid,
      email,
      userCredential.user.displayName
    );
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const existingProfile = await getUserProfile(userCredential.user.uid);
    if (!existingProfile) {
      await createUserProfile(
        userCredential.user.uid,
        userCredential.user.email || "",
        userCredential.user.displayName
      );
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const isAdmin = () => {
    return userProfile?.role === "admin";
  };

  const value = {
    user,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
