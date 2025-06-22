import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();
  const hideFooter = ["/admin/dashboard", "/admin"];

  return (
    <div className="min-h-screen bg-themeBackground text-themeText">
      {pathname === "/admin/dashboard" ? null : <Header />}
      <div className="w-11/12 md:w-9/12 mx-auto">
        <Outlet />
      </div>
      {hideFooter.includes(pathname) ? null : <Footer />}
    </div>
  );
};

export default Layout;
