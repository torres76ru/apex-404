import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage";
import MainLayout from "../modules/MainLayout/MainLayout";
import DailyReports from "../pages/DailyReports";
import NewReport from "../pages/NewReport";
import UserProfile from "../pages/UserProfile";
// import { InitDataPage } from "../modules/InitDataModule/InitDataPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/daily-reports", element: <DailyReports /> },
      { path: "/new-report", element: <NewReport /> },
      { path: "/user-profile", element: <UserProfile /> }
    ]
  }
]);
