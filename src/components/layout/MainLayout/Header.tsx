// Header.tsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NAV_LINKS, ADD_OPTIONS } from "./constants";
import { CLASSES } from "./styles";
import logo from "@/assets/logo.png";
import { FiPlus } from "react-icons/fi";

interface HeaderProps {
  showConnectionAlert: React.ReactNode;
}

export const Header = ({ showConnectionAlert }: HeaderProps) => {
  const { pathname } = useLocation();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAddMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      {showConnectionAlert}
      <div className="max-w-7xl mx-auto w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full transition-transform hover:scale-105"
            >
              <img
                src={logo}
                alt="Logo HeroPet"
                className="h-12 rounded-full border-2 border-indigo-100 shadow-sm"
              />
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">HeroPet</h1>
          </div>

          <nav className="flex gap-2 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  pathname === link.to ? CLASSES.activeNav : CLASSES.inactiveNav
                }`}
                aria-current={pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Botão Adicionar com Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                onMouseEnter={() => setIsAddMenuOpen(true)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-all ${
                  isAddMenuOpen
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                <FiPlus className="text-base" />
                Adicionar
              </button>

              {/* Menu Dropdown */}
              {isAddMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100"
                  onMouseLeave={() => setIsAddMenuOpen(false)}
                >
                  {ADD_OPTIONS.map((option) => (
                    <Link
                      key={option.to}
                      to={option.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={() => setIsAddMenuOpen(false)}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
