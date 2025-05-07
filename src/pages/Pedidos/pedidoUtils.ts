// utils/pedidoUtils.ts
import { PedidoStatus } from "./types";

export const formatarData = (dateString: string | undefined): string => {
  if (!dateString) return "-";

  try {
    // Corrige o problema do fuso horário
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() + offset);

    // Formata no padrão brasileiro
    return date.toLocaleDateString("pt-BR");
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
