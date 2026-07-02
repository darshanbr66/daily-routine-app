import { RouterProvider } from "react-router-dom";

import router from "./app/router";
import AppProviders from "./app/AppProviders";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </AppProviders>
  );
}

export default App;