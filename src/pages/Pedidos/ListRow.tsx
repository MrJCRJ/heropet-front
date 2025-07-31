import { PedidoRowProps } from "../../types/pedidos";
import { formatarData } from "../../utils/date";
import { formatarMoeda } from "../../utils/currency";
import { getStatusColor } from "../../utils/status";

export const PedidoRow = ({ pedido }: PedidoRowProps) => {
  // Verificação segura das parcelas
  const parcelas = pedido.parcelas ?? [];
  const temParcelas = parcelas.length > 0;
  const totalPago = temParcelas
    ? parcelas
        .filter((p) => p.pago)
        .reduce((sum, parcela) => sum + parcela.valor, 0)
    : 0;

  return (
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
        <div>
          <div>Total: {formatarMoeda(pedido.totalPedido)}</div>
          {temParcelas && (
            <div className="text-green-600">
              Pago: {formatarMoeda(totalPago)}
            </div>
          )}
        </div>
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
};
