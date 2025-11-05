"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase/client";
import { setUser, setLoading } from "@/store/slice/authSlice";
import { User, LogOut } from "lucide-react";
import type { RootState } from "@/store";
import Link from "next/link";

export function AuthButton() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      dispatch(setLoading(false));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured() || !auth) {
      alert("Firebase no está configurado. Por favor configura tus credenciales en .env.local");
      return;
    }
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) return null;

  if (user) {
    return (
      <button 
        onClick={handleSignOut} 
        className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
        aria-label="Cerrar sesión"
      >
        <LogOut className="mac-icon-large mac-text-primary" />
      </button>
    );
  }

  return (
    <Link 
      href="/login" 
      className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
      aria-label="Iniciar sesión"
    >
      <User className="mac-icon-large mac-text-primary" />
    </Link>
  );
}
