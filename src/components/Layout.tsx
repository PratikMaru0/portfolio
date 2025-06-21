import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-themeBackground text-themeText">
      {pathname === "/admin/dashboard" ? null : <Header />}
      <div className="w-11/12 md:w-9/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
