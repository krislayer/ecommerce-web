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
        state.productIds.push(productId);
      } else {
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
      state.productIds = state.productIds.filter((id) => id !== productId);
    },
    clearFavorites: (state) => {
      state.productIds = [];
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.productIds = action.payload;
    },
  },
});

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  setFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
