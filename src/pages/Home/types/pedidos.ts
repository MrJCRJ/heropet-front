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

export interface Pedido {
  _id?: string; // Mantenha como opcional para maior flexibilidade
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
  itens: Array<{
    produto: string;
    quantidade: number;
    precoUnitario: number;
    total: number;
  }>;
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
