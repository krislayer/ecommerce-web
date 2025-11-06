import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirestoreUserRepository } from "@/lib/infrastructure/firestore-user.repository";
import { 
  setFavorites, 
  syncFavoritesStart, 
  syncFavoritesSuccess, 
  syncFavoritesError 
} from "@/store/slice/favoritesSlice";
import { toggleFavorite } from "@/store/slice/favoritesSlice";
import type { RootState } from "@/store";
import type { AppDispatch } from "@/store";

const userRepository = new FirestoreUserRepository();

/**
 * Hook personalizado para manejar favoritos con sincronización automática con Firebase
 */
export function useFavorites() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const favorites = useSelector((state: RootState) => state.favorites.productIds);
  const isSyncing = useSelector((state: RootState) => state.favorites.syncing);

  // Cargar favoritos desde Firebase cuando el usuario inicia sesión
  useEffect(() => {
    // Solo ejecutar si hay usuario y no está cargando
    if (!user || loading) return;

    let isMounted = true;

    const loadFavorites = async () => {
      try {
        dispatch(syncFavoritesStart());
        const userData = await userRepository.findById(user.uid);
        
        if (!isMounted) return;
        
        if (userData?.wishlist) {
          dispatch(setFavorites(userData.wishlist));
        } else {
          // Si no existe el usuario en Firestore, crearlo
          await userRepository.create({
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || undefined,
            photoURL: user.photoURL || undefined,
            wishlist: [],
            addresses: [],
          });
          if (isMounted) {
            dispatch(setFavorites([]));
          }
        }
        if (isMounted) {
          dispatch(syncFavoritesSuccess());
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        if (isMounted) {
          dispatch(syncFavoritesError(error instanceof Error ? error.message : "Error desconocido"));
        }
      }
    };

    loadFavorites();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, loading]);

  // Limpiar favoritos cuando el usuario cierra sesión
  useEffect(() => {
    if (!user && !loading) {
      dispatch(setFavorites([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  // Función para agregar/quitar favoritos con sincronización
  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      // Redirigir a login si no está autenticado
      window.location.href = "/login";
      return;
    }

    // Verificar si el producto está actualmente en favoritos antes del toggle
    const isCurrentlyFavorite = favorites.includes(productId);

    // Actualizar Redux inmediatamente (optimistic update)
    dispatch(toggleFavorite(productId));

    // Sincronizar con Firebase
    try {
      if (isCurrentlyFavorite) {
        await userRepository.removeFromWishlist(user.uid, productId);
      } else {
        await userRepository.addToWishlist(user.uid, productId);
      }
    } catch (error) {
      console.error("Error syncing favorite:", error);
      // Revertir el cambio en Redux si falla
      dispatch(toggleFavorite(productId));
      alert("Error al sincronizar favorito. Por favor intenta de nuevo.");
    }
  };

  const isFavorite = (productId: string) => favorites.includes(productId);
  const isAuthenticated = !!user && !loading;

  return {
    favorites,
    isFavorite,
    handleToggleFavorite,
    isAuthenticated,
    isSyncing,
  };
}

