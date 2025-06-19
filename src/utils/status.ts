import { PedidoStatus } from "../pages/Pedidos/types";

export const getStatusColor = (status?: PedidoStatus): string => {
  if (!status) return "bg-gray-100 text-gray-800";

  switch (status.toUpperCase()) {
    case "PAGO":
      return "bg-green-100 text-green-800";
    case "CANCELADO":
    case "ATRASADO":
      return "bg-red-100 text-red-800";
    case "PENDENTE":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
