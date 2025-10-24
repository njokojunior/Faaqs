import "dotenv/config"; // Loads .env
import { auth, db } from "../lib/firebase"; // Use existing firebase instance
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Default admin credentials
const ADMIN_EMAIL = "admin@faaqs.com";
const ADMIN_PASSWORD = "FAAQSAdmin2024!";
const ADMIN_NAME = "FAAQS Admin";

async function createDefaultAdmin() {
  try {
    console.log("Creating default admin user...");

    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    );
    const user = userCredential.user;

    console.log("Admin user created in Auth:", user.uid);

    // Create admin profile in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: ADMIN_EMAIL,
      displayName: ADMIN_NAME,
      role: "admin",
      subscription: {
        plan: "admin",
        status: "active",
        startDate: new Date(),
        endDate: null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Admin profile created in Firestore");
    console.log("\n=== DEFAULT ADMIN CREDENTIALS ===");
    console.log("Email:", ADMIN_EMAIL);
    console.log("Password:", ADMIN_PASSWORD);
    console.log("=================================\n");
    console.log("IMPORTANT: Change this password after first login!");

    process.exit(0);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Admin user already exists!");
      console.log("\n=== DEFAULT ADMIN CREDENTIALS ===");
      console.log("Email:", ADMIN_EMAIL);
      console.log("Password:", ADMIN_PASSWORD);
      console.log("=================================\n");
    } else {
      console.error("Error creating admin:", error);
    }
    process.exit(1);
  }
}

createDefaultAdmin();
