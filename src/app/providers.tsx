"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart-sidebar";
import { Footer } from "@/components/footer";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { useEffect, useState } from "react";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme: _theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Variables theme y mounted se usan para prevenir hydration issues
  // aunque no se usen directamente en el render
  return (
    <div>
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

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
          <ThemeWrapper>
            <ScrollRestoration />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartSidebar />
          </ThemeWrapper>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
