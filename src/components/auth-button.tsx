"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase/client";
import { setUser, setLoading } from "@/store/slice/authSlice";
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
      <div className="flex items-center gap-3">
        <span className="text-sm hidden sm:inline text-adaptive-secondary">
          {user.displayName || user.email}
        </span>
        <button onClick={handleSignOut} className="glass-button px-4 py-2">
          <span className="text-adaptive-primary">Salir</span>
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="glass-button px-4 py-2">
      <span className="text-adaptive-primary">Iniciar Sesión</span>
    </Link>
  );
}
