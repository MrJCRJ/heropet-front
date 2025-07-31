import React from "react";
import { Pedido } from "../types/pedidos";
import { PedidoRow } from "../pages/Pedidos/List/ListRow";

type TableBodyProps = {
  pedidos: Pedido[];
};

export const TableBody: React.FC<TableBodyProps> = ({ pedidos }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {pedidos && pedidos.length > 0 ? (
      pedidos.map((pedido) => (
        <tr
          key={pedido._id}
          className="hover:bg-gray-50 cursor-pointer"
          onClick={() => (window.location.href = `/pedidos/${pedido._id}`)}
        >
          <PedidoRow pedido={pedido} />
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
          {pedidos ? "Nenhum pedido encontrado" : "Carregando..."}
        </td>
      </tr>
    )}
  </tbody>
);
