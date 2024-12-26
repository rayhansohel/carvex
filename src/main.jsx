import "./index.css";
import Routes from "./routes/Routes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={Routes} />
          <ToastContainer
            position="bottom-right"
            hideProgressBar={true}
          />
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
