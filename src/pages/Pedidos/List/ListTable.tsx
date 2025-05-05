import { Pedido } from "../../../api/pedidos";
import { PedidoRow } from "./ListRow";

type PedidoTableProps = {
  pedidos: Pedido[];
  onDeleteClick: (pedidoId: string) => void;
  isDeleting: boolean;
};

export const PedidoTable = ({
  pedidos,
  onDeleteClick,
  isDeleting,
}: PedidoTableProps) => (
  <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tipo
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cliente/Fornecedor
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Data
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ações
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <PedidoRow
              key={pedido._id}
              pedido={pedido}
              onDeleteClick={onDeleteClick}
              isDeleting={isDeleting}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="px-6 py-4 text-center text-sm text-gray-500"
            >
              Nenhum pedido encontrado
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
