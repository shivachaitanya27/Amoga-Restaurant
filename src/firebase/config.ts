import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBT0mfsmCyE6GMC9E0hBtgNRkBlaD0-vrk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "amoga-fd9e5.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://amoga-fd9e5-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "amoga-fd9e5",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "amoga-fd9e5.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "381938560627",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:381938560627:web:69768f5a645709e8f28406"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== "your-api-key"
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.warn("Firebase initialization failed, falling back to local simulation:", error);
  }
} else {
  console.info("Firebase environment variables not detected or incomplete. Running in local state mode with seed data.");
}

export { app, auth, db, storage, firebaseConfig };
