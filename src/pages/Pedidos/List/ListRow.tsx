import { Link } from "react-router-dom";
import { Pedido } from "../../../api/pedidos";
import { formatarData, formatarMoeda, getStatusColor } from "../pedidoUtils";

type PedidoRowProps = {
  pedido: Pedido;
  onDeleteClick: (pedidoId: string) => void;
  isDeleting: boolean;
};

export const PedidoRow = ({
  pedido,
  onDeleteClick,
  isDeleting,
}: PedidoRowProps) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
      {pedido._id?.substring(0, 6)}...
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      <span
        className={`px-2 py-1 ${
          pedido.tipo === "VENDA"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800"
        } text-xs font-medium rounded`}
      >
        {pedido.tipo === "VENDA" ? "Venda" : "Compra"}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {pedido.nomeClienteFornecedor || "-"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {formatarData(pedido.dataPedido)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {formatarMoeda(pedido.totalPedido)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
          pedido.status
        )}`}
      >
        {pedido.status || "-"}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      <div className="flex gap-2">
        <Link
          to={`/pedidos/${pedido._id}`}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium rounded transition-colors"
        >
          Ver
        </Link>
        <Link
          to={`/pedidos/${pedido._id}/editar`}
          className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-blue-800 text-xs font-medium rounded transition-colors"
        >
          Editar
        </Link>
        <button
          onClick={() => onDeleteClick(pedido._id!)}
          className="px-3 py-1 bg-red-200 hover:bg-red-300 text-red-800 text-xs font-medium rounded transition-colors"
          disabled={isDeleting}
        >
          Excluir
        </button>
      </div>
    </td>
  </tr>
);
