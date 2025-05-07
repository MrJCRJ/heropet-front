// src/components/layout/MainLayout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

interface LayoutProps {
  children?: React.ReactNode;
  cardClassName?: string;
  cardShadow?: boolean;
}

const MainLayout = ({
  children,
  cardClassName = "bg-white",
  cardShadow = true,
}: LayoutProps) => {
  const { pathname } = useLocation();

  // Configurações atualizadas com nova paleta
  const navigation = {
    links: [
      { to: "/", label: "Home" },
      { to: "/fornecedores", label: "Fornecedores" },
      { to: "/clientes", label: "Clientes" },
      { to: "/pedidos", label: "Pedidos" },
    ],
    activeClass:
      "bg-indigo-50 text-indigo-700 font-semibold border-b-2 border-indigo-600",
    inactiveClass: "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600",
  };

  const footer = {
    links: [
      { href: "/politica-de-privacidade", label: "Política de Privacidade" },
      { href: "/termos-de-uso", label: "Termos de Uso" },
      { href: "/contato", label: "Contato" },
    ],
    text: `© ${new Date().getFullYear()} HeroPet - Todos os direitos reservados`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Atualizado */}
      <header className="bg-white shadow-sm">
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
              {navigation.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    pathname === link.to
                      ? navigation.activeClass
                      : navigation.inactiveClass
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

      {/* Conteúdo Principal Atualizado */}
      <main className="flex-1 p-4 sm:p-6">
        <div
          className={`max-w-7xl mx-auto p-8 rounded-xl border border-gray-200 ${
            cardShadow ? "shadow-md" : ""
          } ${cardClassName}`}
        >
          {children || <Outlet />}
        </div>
      </main>

      {/* Footer Atualizado */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center px-4">
          <p className="text-gray-600 text-sm">{footer.text}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 text-sm transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
