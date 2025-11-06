"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart-sidebar";
import { Footer } from "@/components/footer";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { FavoritesSync } from "@/components/favorites-sync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          storageKey="theme"
        >
          <ScrollRestoration />
          <FavoritesSync />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
