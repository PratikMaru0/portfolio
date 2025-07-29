import React from "react";
import SideBar from "../components/dashboard/SideBar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Dashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);

  return (
    <div>
      <ScrollToTop />
      {!isSideBarOpen && (
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-themeText rounded-lg sm:block md:hidden"
          onClick={() => {
            setIsSideBarOpen(!isSideBarOpen);
          }}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      )}
      <SideBar
        style={`${
          isSideBarOpen ? "block" : "hidden"
        } md:block bg-themeBackground`}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <div className="p-4 sm:ml-40 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
