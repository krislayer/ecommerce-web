import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  productIds: string[];
  syncing: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  productIds: [],
  syncing: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.productIds.indexOf(productId);
      
      if (index === -1) {
        // Agregar a favoritos
        state.productIds.push(productId);
      } else {
        // Quitar de favoritos
        state.productIds.splice(index, 1);
      }
      state.error = null; // Limpiar error al hacer toggle
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (!state.productIds.includes(productId)) {
        state.productIds.push(productId);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.productIds = state.productIds.filter(id => id !== productId);
    },
    clearFavorites: (state) => {
      state.productIds = [];
      state.error = null;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.productIds = action.payload;
      state.error = null;
    },
    syncFavoritesStart: (state) => {
      state.syncing = true;
      state.error = null;
    },
    syncFavoritesSuccess: (state) => {
      state.syncing = false;
      state.error = null;
    },
    syncFavoritesError: (state, action: PayloadAction<string>) => {
      state.syncing = false;
      state.error = action.payload;
    },
  },
});

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  setFavorites,
  syncFavoritesStart,
  syncFavoritesSuccess,
  syncFavoritesError,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
