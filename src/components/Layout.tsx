import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toast } from "./common";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeAlertMsg } from "../utils/store/alertSlice";

const Layout = () => {
  const { pathname } = useLocation();
  const hideFooter = [/^\/admin(\/.*)?$/];
  const alertMsg = useSelector((store: { alert: any }) => store.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeout: any;
    if (alertMsg) {
      timeout = setTimeout(() => {
        dispatch(removeAlertMsg());
      }, 3000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [alertMsg]);

  const shouldHideFooter = hideFooter.some((pattern) =>
    typeof pattern === "string" ? pathname === pattern : pattern.test(pathname)
  );

  return (
    <div className="min-h-screen bg-themeBackground text-themeText flex flex-col">
      <Header />
      <div className="flex-1 w-11/12 md:w-9/12 mx-auto">
        <Outlet />
        {alertMsg && (
          <Toast message={alertMsg.message} status={alertMsg.status} />
        )}
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;
