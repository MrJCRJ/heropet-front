import { Outlet, Link } from "react-router-dom";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-gray-100 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto w-full px-4 py-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src=""
              alt="Logo HeroPet"
              className="h-16 rounded-full border-4 border-blue-500 transition-transform hover:scale-105"
            />
            <h1 className="text-3xl font-bold text-gray-100">HeroPet</h1>
          </div>
          <nav className="flex justify-center gap-6 px-3 py-3 bg-gray-700 rounded-lg">
            <Link
              to="/"
              className="text-gray-100 no-underline px-4 py-2 rounded transition-all hover:bg-blue-500 hover:text-white flex items-center gap-2 font-medium"
            >
              Home
            </Link>
            <Link
              to="/fornecedores"
              className="text-gray-100 no-underline px-4 py-2 rounded transition-all hover:bg-blue-500 hover:text-white flex items-center gap-2 font-medium"
            >
              Fornecedores
            </Link>
            <Link
              to="/clientes"
              className="text-gray-100 no-underline px-4 py-2 rounded transition-all hover:bg-blue-500 hover:text-white flex items-center gap-2 font-medium"
            >
              Clientes
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {children || <Outlet />}
      </main>
      <footer className="bg-gray-800 text-gray-100 py-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
          <p>
            © {new Date().getFullYear()} HeroPet - Todos os direitos reservados
          </p>
          <div className="flex gap-6">
            <a
              href="/politica-de-privacidade"
              className="text-gray-100 no-underline transition-colors hover:text-blue-500"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos-de-uso"
              className="text-gray-100 no-underline transition-colors hover:text-blue-500"
            >
              Termos de Uso
            </a>
            <a
              href="/contato"
              className="text-gray-100 no-underline transition-colors hover:text-blue-500"
            >
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
