"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase/client";
import { setUser, setLoading } from "@/store/slice/authSlice";
import type { RootState } from "@/store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      dispatch(setLoading(false));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured() || !auth) {
      setError("Firebase no está configurado. Por favor configura tus credenciales en .env.local");
      return;
    }
    
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Error al iniciar sesión. Por favor intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen mac-bg-grouped flex items-center justify-center">
        <div className="mac-card text-center p-mac-xl">
          <div className="flex flex-col items-center gap-mac-md">
            <div className="mac-activity-indicator-lg"></div>
            <p className="mac-text-body mac-text-secondary">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Ya se redirige en el useEffect
  }

  return (
    <div className="min-h-screen mac-bg-grouped flex items-center justify-center px-mac-md py-mac-xl">
      <div className="max-w-md w-full mac-fade-in">
        <div className="mac-card text-center">
          <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
            Iniciar Sesión
          </h1>
          
          <p className="mac-text-body mac-text-secondary mb-mac-xl">
            Ingresa con tu cuenta de Google para continuar
          </p>

          {error && (
            <div className="mb-mac-lg p-mac-md mac-card bg-mac-red/10 border border-mac-red/20">
              <p className="mac-text-body" style={{ color: 'var(--mac-red)' }}>
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            className="mac-button-primary w-full mb-mac-md"
          >
            Continuar con Google
          </button>

          <p className="mac-text-caption-1 mac-text-tertiary">
            Al continuar, aceptas nuestros términos y condiciones
          </p>
        </div>
      </div>
    </div>
  );
}
