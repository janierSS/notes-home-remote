import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import appStore  from "myNotesHost/appStore";
import AppDev from "./AppDev.tsx";
import "./mainDev.scss";
// import { Provider } from "react-redux";

// console.log('appaStore: ', appStore);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Provider store={appStore}> */}
      <AppDev />
    {/* </Provider> */}
  </StrictMode>
);
