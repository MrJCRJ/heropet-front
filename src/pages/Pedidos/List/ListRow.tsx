import { PedidoRowProps } from "../types";
import { formatarData, formatarMoeda, getStatusColor } from "../pedidoUtils";

export const PedidoRow = ({ pedido }: PedidoRowProps) => (
  <>
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
  </>
);
