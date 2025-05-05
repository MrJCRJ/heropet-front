import { Pedido } from "../../Home/types/pedidos";
import { PedidoRow } from "./ListRow";
import { OrdenacaoPedido } from "./usePedidoList";

type PedidoTableProps = {
  pedidos: Pedido[];
  ordenacao: OrdenacaoPedido;
  onOrdenarClick: () => void;
};

export const PedidoTable = ({
  pedidos,
  ordenacao,
  onOrdenarClick,
}: PedidoTableProps) => {
  // Debug: verifique os dados recebidos
  console.log("Pedidos recebidos:", pedidos);

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente/Fornecedor
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={onOrdenarClick}
            >
              Data {ordenacao === "data_desc" ? "↓" : "↑"}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pedidos && pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr
                key={pedido._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  (window.location.href = `/pedidos/${pedido._id}`)
                }
              >
                <PedidoRow pedido={pedido} />
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                {pedidos ? "Nenhum pedido encontrado" : "Carregando..."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
