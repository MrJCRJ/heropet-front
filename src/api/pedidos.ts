// File: src/api/pedidos.ts
import httpClient from "./httpClient";

export interface ItemPedido {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
}

export interface Pedido {
  _id?: string;
  tipo: "VENDA" | "COMPRA";
  status: "PENDENTE" | "PROCESSANDO" | "PAGO" | "CANCELADO" | "ATRASADO";
  documentoClienteFornecedor: string;
  nomeClienteFornecedor: string;
  dataPedido: string;
  dataEntrega?: string;
  vendedor?: string;
  transportadora?: string;
  formaPagamento?: string;
  formaEntrega?: string;
  dataPagamento?: string;
  prazoPagamento?: string;
  condicaoPagamento?: string;
  desconto?: number;
  itens: ItemPedido[];
  totalPedido: number;
  temNotaFiscal: boolean;
  observacoes?: string;
}

export interface PeriodFilter {
  type: "month" | "year";
  month?: number;
  year: number;
}

export const criarPedido = (pedido: Omit<Pedido, "_id">) => {
  return httpClient.post("/pedidos", pedido);
};

export const listarPedidos = (tipo?: "VENDA" | "COMPRA") => {
  const url = tipo ? `/pedidos?tipo=${tipo}` : "/pedidos";
  return httpClient.get(url);
};

export const buscarPedido = (id: string) => {
  return httpClient.get(`/pedidos/${id}`);
};

export const atualizarPedido = (id: string, dados: Partial<Pedido>) => {
  return httpClient.put(`/pedidos/${id}`, dados);
};

export const removerPedido = (id: string) => {
  return httpClient.delete(`/pedidos/${id}`);
};
