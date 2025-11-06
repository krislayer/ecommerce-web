import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import cartReducer from "./slice/cartSlice";
import authReducer from "./slice/authSlice";
import favoritesReducer from "./slice/favoritesSlice";

// Crear storage seguro para SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Configuración específica para cada reducer
const cartPersistConfig = {
  key: "cart",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

