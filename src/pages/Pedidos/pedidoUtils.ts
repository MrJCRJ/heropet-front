// utils/pedidoUtils.ts
import { PedidoStatus } from "./pedidoTypes";

export const formatarData = (dataString?: string): string => {
  if (!dataString) return "-";
  try {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  } catch {
    return "-";
  }
};

export const formatarMoeda = (valor?: number): string => {
  if (valor === undefined || valor === null) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const getStatusColor = (status?: PedidoStatus): string => {
  switch (status?.toUpperCase()) {
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
