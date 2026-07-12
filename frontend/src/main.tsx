import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { router } from "./router"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RouterProvider } from "react-router-dom";
import { FleetProvider } from "./context/FleetContext";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <FleetProvider>
        <RouterProvider router={router} />
        <Toaster />
      </FleetProvider>
    </ThemeProvider>
  </StrictMode>
)

