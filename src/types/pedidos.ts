// pedidos.types.ts
export const OrdenacaoValues = ["data_asc", "data_desc"] as const;
export type OrdenacaoPedido = (typeof OrdenacaoValues)[number];

export const FiltroStatusValues = [
  "PENDENTE",
  "PROCESSANDO",
  "PAGO",
  "CANCELADO",
  "ATRASADO",
] as const;
export type FiltroStatus = (typeof FiltroStatusValues)[number];

export interface ListarPedidosParams {
  tipo?: "VENDA" | "COMPRA" | "TODOS";
  status?: FiltroStatus;
  ordenacao?: OrdenacaoPedido;
  mes?: number;
  ano?: number;
  page?: number;
  limit?: number;
}

export interface PeriodFilter {
  type: "month" | "year";
  month?: number;
  year: number;
}
