import { Link } from "react-router-dom";

export const PedidoHeader = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
    <div className="flex items-center gap-4">
      <Link
        to="/fornecedores"
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
      >
        Voltar
      </Link>
      <h1 className="text-2xl font-bold text-gray-900">Lista de Pedidos</h1>
    </div>
    <Link
      to="/pedidos/novo"
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
    >
      Novo Pedido
    </Link>
  </div>
);
