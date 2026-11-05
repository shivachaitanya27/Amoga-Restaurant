import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isDemo?: boolean;
}

export const getAdminCredentials = () => {
  const customEmail = localStorage.getItem('amoga_admin_email') || import.meta.env.VITE_ADMIN_EMAIL || 'admin@amoga.in';
  const customPass = localStorage.getItem('amoga_admin_pass') || import.meta.env.VITE_ADMIN_PASSWORD || 'amoga2026';
  return { email: customEmail, password: customPass };
};

export const setAdminCredentials = (email: string, pass: string) => {
  localStorage.setItem('amoga_admin_email', email.trim().toLowerCase());
  localStorage.setItem('amoga_admin_pass', pass.trim());
};

export const loginAdmin = async (email: string, password: string): Promise<AdminUser> => {
  const currentCreds = getAdminCredentials();
  const inputEmail = email.trim().toLowerCase();
  const inputPass = password.trim();

  // Allow immediate master login with current admin credentials or default admin@amoga.in / amoga2026
  if (
    (inputEmail === currentCreds.email.toLowerCase() && inputPass === currentCreds.password) ||
    (inputEmail === 'admin@amoga.in' && inputPass === 'amoga2026')
  ) {
    const demoUser: AdminUser = {
      uid: "amoga-admin-master",
      email: currentCreds.email,
      displayName: "Shiva Chaitanya (Owner)",
      isDemo: true
    };
    sessionStorage.setItem("amoga_demo_admin", JSON.stringify(demoUser));
    return demoUser;
  }

  if (isFirebaseConfigured && auth) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || "Restaurant Admin"
      };
    } catch (firebaseErr: any) {
      console.warn("Firebase Auth error:", firebaseErr);
      throw new Error(
        firebaseErr.message || 
        "Invalid Firebase credentials. Make sure this email/password is created under Firebase Console > Authentication > Users, or use admin@amoga.in / amoga2026."
      );
    }
  }

  throw new Error("Invalid admin credentials. Use registered Firebase admin or admin@amoga.in / amoga2026");
};

export const logoutAdmin = async (): Promise<void> => {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("SignOut error:", e);
    }
  }
  sessionStorage.removeItem("amoga_demo_admin");
};

export const subscribeToAuthChanges = (callback: (user: AdminUser | null) => void): (() => void) => {
  let unsubscribeFirebase = () => {};

  if (isFirebaseConfigured && auth) {
    unsubscribeFirebase = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Admin"
        });
        return;
      }

      // If no Firebase user, check if demo admin is stored in session
      const stored = sessionStorage.getItem("amoga_demo_admin");
      if (stored) {
        try {
          callback(JSON.parse(stored));
        } catch {
          callback(null);
        }
      } else {
        callback(null);
      }
    });

    return unsubscribeFirebase;
  }

  // Check demo user in session
  const stored = sessionStorage.getItem("amoga_demo_admin");
  if (stored) {
    try {
      callback(JSON.parse(stored));
    } catch {
      callback(null);
    }
  } else {
    callback(null);
  }

  return () => {};
};
