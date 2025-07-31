import { Link } from "react-router-dom";

export const PedidoHeader = () => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold text-gray-900">Detalhes do Pedido</h1>
    <Link
      to="/pedidos"
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium"
    >
      Voltar para lista
    </Link>
  </div>
);
