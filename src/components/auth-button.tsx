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
      <button onClick={handleSignOut} className="glass-button-round relative" aria-label="Cerrar sesión">
        <LogOut className="w-6 h-6 text-white relative z-10" />
      </button>
    );
  }

  return (
    <Link href="/login" className="glass-button-round relative" aria-label="Iniciar sesión">
      <User className="w-6 h-6 text-white relative z-10" />
    </Link>
  );
}
