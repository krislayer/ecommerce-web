"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase/client";
import { setUser, setLoading } from "@/store/slice/authSlice";
import type { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { LiquidGlassCard } from "@/components/liquid-glass-card";
import { AdvancedLiquidGlassCard } from "@/components/advanced-liquid-glass-card";

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
      <div className="max-w-md mx-auto px-4 py-20 fade-in">
        <AdvancedLiquidGlassCard variant="hero" className="text-center">
          <p className="text-white/90">Cargando...</p>
        </AdvancedLiquidGlassCard>
      </div>
    );
  }

  if (user) {
    return null; // Ya se redirige en el useEffect
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20 fade-in">
      <AdvancedLiquidGlassCard 
        variant="hero"
        className="mb-4"
      >
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Iniciar Sesión
          </h1>
          
          <p className="text-white/90 mb-8">
            Ingresa con tu cuenta de Google para continuar
          </p>

          {error && (
            <div className="mb-6 p-4 glass-secondary text-white text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            className="w-full glass-button-primary py-4 px-6 mb-4"
          >
            <span className="text-white font-semibold text-lg relative z-10">
              Continuar con Google
            </span>
          </button>

          <p className="text-center text-sm text-white/70">
            Al continuar, aceptas nuestros términos y condiciones
          </p>
        </div>
      </AdvancedLiquidGlassCard>
    </div>
  );
}

