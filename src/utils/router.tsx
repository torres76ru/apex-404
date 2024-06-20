import { createBrowserRouter } from "react-router-dom";
// import StartPage from "../pages/StartPage";
import { InitDataPage } from "../modules/InitDataModule/InitDataPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitDataPage />
  }
]);
