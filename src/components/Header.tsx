import { useState } from "react";
import { headerTxt, commonTxt } from "../constants/texts";
import { Link } from "react-router-dom";
import { darkModeIcon } from "../assets";
import { Button } from "./common";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-3 bg-white rounded-b-2xl shadow flex items-center justify-between mt-2 relative z-20">
      {/* Logo  */}
      <div className="flex items-center text-2xl font-bold">
        {commonTxt.firstName}
        <span className="text-primary ml-1">.</span>
      </div>

      {/* Navigation (hidden on mobile)  */}
      <nav className="flex-1 flex justify-center">
        <ul className="hidden md:flex bg-gradient-to-r from-white/80 to-pink-100/30 rounded-full px-6 py-2 gap-6 shadow-sm">
          {headerTxt.navigation.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-primary transition-colors px-3 py-1 rounded-full"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: Theme toggle and Connect button */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Hamburger menu (mobile only) */}

        {/* Moon icon placeholder  */}
        <img className="text-xl md:inline" src={darkModeIcon} />

        <Button
          style="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          onClick={() => setMenuOpen((open) => !open)}
          text={""}
        >
          <svg
            className="w-7 h-7 text-gray-700"
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

        <Button text={headerTxt.connect} style="hidden md:flex" />
      </div>

      {/* Mobile menu dropdown  */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl flex flex-col items-center py-4 md:hidden animate-fade-in z-30">
          {headerTxt.navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="w-full text-center py-2 text-lg text-gray-700 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.text}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-4">
            <Button text={headerTxt.connect} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
