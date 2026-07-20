import { RouterProvider } from "react-router-dom";

import router from "./app/router";
import AppProviders from "./app/AppProviders";

import { Toaster } from "@/components/ui/sonner";

import { useInitializeAuth } from "@/features/auth/hooks/useInitializeAuth";

function AppContent() {
  useInitializeAuth();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        richColors
        position="top-right"
      />
    </>
  );
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;