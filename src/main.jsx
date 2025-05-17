import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { createPortal } from "react-dom";
import UpdateEvent from "./Components/UpdateModel/Updateevent";
import { Toaster } from "sonner";

createPortal(UpdateEvent, document.getElementById("root-model"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center" closeButton theme="system" richColors />
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
