import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/themeProvider.tsx";
import ModalProvider from "./context/modalProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <ModalProvider>
            <Toaster />
            <App />
          </ModalProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
