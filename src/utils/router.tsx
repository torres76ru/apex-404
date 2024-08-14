import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../modules/MainLayout/MainLayout";
import DailyReports from "../pages/DailyReports";
import NewReport from "../pages/NewReport";
import UserProfile from "../pages/UserProfile";
import App from "@/App";
import StartPage from "@/pages/StartPage";
import AdminPage from "@/pages/AdminPage";
import Compass from "@/pages/Compass";
import AccessDenied from "@/pages/AccessDenied";
import DailyReportsTEMP from "@/pages/DailyReportsTEMP";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StartPage />
      },
      {
        path: "/compass",
        element: <Compass />
      },
      {
        path: "/access-denied",
        element: <AccessDenied />
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/daily-reports", element: <DailyReports /> },
          { path: "/daily-reports-2", element: <DailyReportsTEMP /> },
          { path: "/new-report", element: <NewReport /> },
          { path: "/user-profile", element: <UserProfile /> },
          { path: "/admin", element: <AdminPage /> }
        ]
      }
    ]
  }
]);
