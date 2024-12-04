import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "myNotesHost/appStore";
import AuthReceiptProvider from "myNotesHost/AuthReceiptProvider";
import AppDev from "./AppDev.tsx";
import "./mainDev.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <AuthReceiptProvider>
        <AppDev />
      </AuthReceiptProvider>
    </Provider>
  </StrictMode>
);
