import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-pulse">
        404 - Página Não Encontrada
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
        A página que você está procurando pode ter sido removida, ter seu nome
        alterado ou está temporariamente indisponível.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFound;
