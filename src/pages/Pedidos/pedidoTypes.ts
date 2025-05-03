// types/pedidoTypes.ts
export type PedidoStatus =
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

export interface Parcela {
  numero: number;
  dataVencimento: string;
  valor: number;
  pago: boolean;
}

export interface Pedido {
  _id?: string;
  tipo: "VENDA" | "COMPRA";
  status: PedidoStatus;
  documentoClienteFornecedor: string;
  nomeClienteFornecedor: string;
  dataPedido: string;
  dataEntrega?: string;
  itens: ItemPedido[];
  totalPedido: number;
  temNotaFiscal: boolean;
  observacoes?: string;
  parcelas?: Parcela[];
}
