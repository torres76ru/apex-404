import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <div
        style={{
          paddingBottom: "82px",
          minHeight: "100vh",
          padding: "0 0 82px 0",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Outlet />
      </div>
      <Navbar />
      <ScrollRestoration />
    </>
  );
};

export default MainLayout;
