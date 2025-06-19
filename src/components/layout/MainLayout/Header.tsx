import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NAV_LINKS } from "./constants";
import { CLASSES } from "./styles";
import logo from "@/assets/logo.png";

interface HeaderProps {
  showConnectionAlert: React.ReactNode;
}

export const Header = ({ showConnectionAlert }: HeaderProps) => {
  const { pathname } = useLocation();

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

          <nav className="flex gap-2">
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
          </nav>
        </div>
      </div>
    </header>
  );
};
