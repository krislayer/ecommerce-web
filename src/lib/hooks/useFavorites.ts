import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/slice/favoritesSlice";
import type { RootState } from "@/store";
import type { AppDispatch } from "@/store";

/**
 * Lista de deseos ligera: solo Redux + persistencia local (redux-persist), sin servidor.
 */
export function useFavorites() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.productIds);

  const handleToggleFavorite = (productId: string) => {
    dispatch(toggleFavorite(productId));
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return {
    favorites,
    isFavorite,
    handleToggleFavorite,
  };
}
