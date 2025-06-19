import { ItemPedido } from "../../pages/Pedidos/types";

interface ItemsTableProps {
  items: ItemPedido[];
  removerItem: (index: number) => void;
  totalPedido: number;
}

const formatarMoeda = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const ItemsTable = ({
  items,
  removerItem,
  totalPedido,
}: ItemsTableProps) => (
  <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Produto
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quantidade
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Preço Unitário
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ações
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.produto}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.quantidade}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {formatarMoeda(item.precoUnitario)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {formatarMoeda(item.total)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button
                type="button"
                onClick={() => removerItem(index)}
                className="text-red-600 hover:text-red-900 font-medium"
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className="bg-gray-50">
        <tr>
          <td
            colSpan={3}
            className="px-6 py-4 text-right text-sm font-medium text-gray-500"
          >
            <strong>Total do Pedido:</strong>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <strong>{formatarMoeda(totalPedido)}</strong>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
);
