import { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { headerTxt, commonTxt } from "../constants/texts";
import { Button } from "./common";
import Theme from "./Theme";
import ProfileIcon from "./common/ProfileIcon";
import { useSelector } from "react-redux";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const admin = useSelector((store: { admin: any }) => store.admin);
  const [activeSection, setActiveSection] = useState("home");
  const navLinks = headerTxt.navigation;
  const isActive = (sectionId) => {
    if (sectionId === "admin") {
      return isAdminRoute;
    }
    return activeSection === sectionId;
  };

  // Check if we're on an admin route
  const isAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname === "/admin";

  useEffect(() => {
    // If we're on admin route, set active section to admin
    if (isAdminRoute) {
      setActiveSection("admin");
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header height
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].path);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].path);
          // Update URL hash without triggering scroll
          if (window.location.hash !== `#${navLinks[i].path}`) {
            window.history.replaceState(null, null, `#${navLinks[i].path}`);
          }
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdminRoute, navLinks]);

  const handleNavigation = (linkPath: string) => {
    if (isAdminRoute) {
      // If on admin route, navigate to main page first
      navigate("/");
      // Then scroll to section after a short delay to ensure page loads
      setTimeout(() => {
        const element = document.getElementById(linkPath);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          window.history.pushState(null, "", `#${linkPath}`);
        }
      }, 100);
    } else {
      // If on main page, just scroll to section
      const element = document.getElementById(linkPath);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", `#${linkPath}`);
      }
    }
  };
  return (
    <div className="sticky top-0 w-full px-4 py-3 bg-themeBackground shadow-primary/20 shadow-xl rounded-b-sm shadow-top flex items-center justify-between z-20">
      {/* Logo  */}
      <div
        onClick={() => handleNavigation("home")}
        className="flex links-center text-2xl font-bold text-themeText select-none cursor-pointer"
      >
        {commonTxt.firstName}
        <span className="text-primary ml-1">.</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex justify-center text-lg">
        <ul className="hidden md:flex bg-themeBackground/80 rounded-full px-6 py-2 gap-6 shadow-sm">
          {headerTxt.navigation.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                handleNavigation(link.path);
                setMenuOpen(false);
              }}
              className={`w-full text-center transition-colors duration-200 cursor-pointer ${
                isActive(link.path)
                  ? "text-primary "
                  : "text-themeText hover:text-primary/80"
              }`}
            >
              {link.text}
            </button>
          ))}
          {admin && (
            <NavLink
              to="/admin"
              className={`hidden md:block ${
                isActive("admin")
                  ? "text-primary "
                  : "text-themeText hover:text-primary/80"
              }`}
            >
              Admin
            </NavLink>
          )}
        </ul>
      </nav>

      {/* Right section */}
      <div className="flex items-center">
        <Theme />
        <Button
          style="md:hidden p-2 rounded border-none focus:outline-none focus:ring-0"
          onClick={() => setMenuOpen((open) => !open)}
          text={""}
        >
          <svg
            className="w-7 h-7 text-themeText"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </Button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-themeBackground shadow-custom rounded-b-2xl flex flex-col items-center py-4 md:hidden animate-fade-in z-30 gap-4 text-lg">
          {headerTxt.navigation.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                handleNavigation(link.path);
                setMenuOpen(false);
              }}
              className={`w-full text-center transition-colors duration-200 cursor-pointer ${
                isActive(link.path)
                  ? "text-primary "
                  : "text-themeText hover:text-primary/80"
              }`}
            >
              {link.text}
            </button>
          ))}
          {admin && (
            <NavLink
              to="/admin"
              onClick={() => {
                setMenuOpen(false);
              }}
              className={` block md:hidden ${
                isActive("admin")
                  ? "text-primary "
                  : "text-themeText hover:text-primary/80"
              }`}
            >
              Admin
            </NavLink>
          )}
        </div>
      )}
      {admin && <ProfileIcon email={admin.emailId} />}
    </div>
  );
};

export default Header;
