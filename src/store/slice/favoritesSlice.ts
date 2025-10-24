import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  productIds: string[];
}

const initialState: FavoritesState = {
  productIds: [],
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
    },
  },
});

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
