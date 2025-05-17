import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-themeBackground text-themeText">
      <Header />
      <div className="w-11/12 md:w-9/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
