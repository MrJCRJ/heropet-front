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

// Adicione esta interface para definir o tipo Parcela
export interface Parcela {
  numero: number;
  dataVencimento: string;
  valor: number;
  pago: boolean;
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
  parcelas?: Parcela[];
  condicaoPagamento?: string;
}
