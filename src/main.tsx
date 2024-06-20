import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";
import { SDKProvider } from "@tma.js/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SDKProvider acceptCustomStyles debug>
      <AppRoot>
        <RouterProvider router={router} />
      </AppRoot>
    </SDKProvider>
  </React.StrictMode>
);
