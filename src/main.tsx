import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";
import { SDKProvider } from "@tma.js/sdk-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SDKProvider acceptCustomStyles debug>
      <RouterProvider router={router} />
    </SDKProvider>
  </React.StrictMode>
);
