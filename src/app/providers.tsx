"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { store, persistor } from "@/store";
import { Navbar } from "@/components/layout/navbar";
import { WelcomeToast } from "@/components/welcome-toast";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { Loading } from "@/components/loading";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme storageKey="qc-theme">
      <Provider store={store}>
        <PersistGate loading={<Loading fullScreen size="xl" label="Cargando aplicación" />} persistor={persistor}>
          <ScrollRestoration />
          <WelcomeToast />
          <Toaster closeButton theme="system" />
          <Navbar />
          <main>{children}</main>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
