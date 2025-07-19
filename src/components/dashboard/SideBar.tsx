import { Link } from "react-router-dom";
import sideBarTxt from "../../constants/texts/dashboard/sideBarTxt";

interface sidebarProps {
  style?: string;
  setIsSideBarOpen: (isSideBarOpen: boolean) => void;
}

const SideBar = ({ style, setIsSideBarOpen }: sidebarProps) => {
  return (
    <aside
      id="default-sidebar"
      className={`fixed left-0 h-screen w-64 transition-transform sm:bg-themeBackground/80 md:bg-themeText/10 ${
        style ? style : ""
      }`}
      aria-label="Sidebar"
    >
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-themeText rounded-lg sm:block md:hidden"
        onClick={() => {
          setIsSideBarOpen(false);
        }}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </button>

      <p className="text-lg mt-4 mx-4 font-bold mb-2 text-themeText">
        {sideBarTxt.dashboard}
      </p>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {sideBarTxt.navigation.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center p-2 rounded-lg group"
              >
                <span className="ml-3">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
