import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { headerTxt, commonTxt } from "../constants/texts";
import { Button } from "./common";
import Theme from "./Theme";
import ProfileIcon from "./common/ProfileIcon";
import { useSelector } from "react-redux";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const admin = useSelector((store: { admin: any }) => store.admin);
  const [activeSection, setActiveSection] = useState("#home");
  const navLinks = headerTxt.navigation;
  const isActive = (sectionId) => activeSection === sectionId;

  useEffect(() => {
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
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Update URL hash
      window.history.pushState(null, null, `#${sectionId}`);
    }
  };
  return (
    <div className="sticky top-0 w-full px-4 py-3 bg-themeBackground shadow-primary/20 shadow-xl rounded-b-sm shadow-top flex items-center justify-between z-20">
      {/* Logo  */}
      <div
        onClick={() => navigate("/")}
        className="flex links-center text-2xl font-bold text-themeText select-none cursor-pointer"
      >
        {commonTxt.firstName}
        <span className="text-primary ml-1">.</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex justify-center">
        <ul className="hidden md:flex bg-themeBackground/80 rounded-full px-6 py-2 gap-6 shadow-sm">
          {headerTxt.navigation.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                scrollToSection(link.path);
                setMenuOpen(false);
              }}
              className={`w-full text-center py-2 text-lg transition-colors duration-200 cursor-pointer ${
                isActive(link.path)
                  ? "text-primary "
                  : "text-themeText hover:text-primary/80"
              }`}
            >
              {link.text}
            </button>
          ))}
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
        <div className="absolute top-full left-0 w-full bg-themeBackground shadow-custom rounded-b-2xl flex flex-col items-center py-4 md:hidden animate-fade-in z-30">
          {headerTxt.navigation.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                scrollToSection(link.path);
                setMenuOpen(false);
              }}
              className={`w-full text-center py-2 text-lg transition-colors duration-200 cursor-pointer ${
                isActive(link.path)
                  ? "text-primary "
                  : "text-themeText hover:text-primary/80"
              }`}
            >
              {link.text}
            </button>
          ))}
        </div>
      )}
      {admin && <ProfileIcon email={admin.emailId} />}
    </div>
  );
};

export default Header;
