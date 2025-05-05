// File: src/api/pedidos.ts
import httpClient from "./httpClient";

// Definindo os tipos de filtro
export type FiltroPedido = "TODOS" | "VENDA" | "COMPRA";
export type FiltroStatus =
  | "PENDENTE"
  | "PROCESSANDO"
  | "PAGO"
  | "CANCELADO"
  | "ATRASADO";

export interface ItemPedido {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
}

export interface ListarPedidosParams {
  tipo?: FiltroPedido;
  status?: FiltroStatus;
  ordenacao?: "data_asc" | "data_desc";
  page?: number;
  limit?: number;
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
  parcelas?: Array<{
    numero: number;
    dataVencimento: string;
    valor: number;
    pago: boolean;
  }>;
}

export interface PeriodFilter {
  type: "month" | "year";
  month?: number;
  year: number;
}

export interface ListarPedidosParams {
  tipo?: FiltroPedido;
  status?: FiltroStatus;
  ordenacao?: "data_asc" | "data_desc";
  page?: number;
  limit?: number;
}

export const criarPedido = (pedido: Omit<Pedido, "_id">) => {
  return httpClient.post("/pedidos", pedido);
};

export const listarPedidos = async (params?: ListarPedidosParams) => {
  // Garante que valores undefined não sejam enviados
  const cleanParams: Record<string, string> = {};

  if (params?.tipo && params.tipo !== "TODOS") {
    cleanParams.tipo = params.tipo;
  }

  if (params?.status) {
    cleanParams.status = params.status;
  }

  if (params?.ordenacao) {
    cleanParams.ordenacao = params.ordenacao;
  }

  const response = await httpClient.get("/pedidos", {
    params: cleanParams,
  });

  return response.data;
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
