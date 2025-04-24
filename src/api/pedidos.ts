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
  status: string;
  documentoClienteFornecedor: string;
  nomeClienteFornecedor: string;
  dataPedido: string;
  dataEntrega?: string;
  itens: ItemPedido[];
  totalPedido: number;
  temNotaFiscal: boolean;
  observacoes?: string;
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
