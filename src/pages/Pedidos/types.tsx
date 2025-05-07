// types.ts
export type FiltroPedido = "TODOS" | "VENDA" | "COMPRA";
export type FiltroStatus =
  | "PAGO"
  | "PENDENTE"
  | "CANCELADO"
  | "PROCESSANDO"
  | "ATRASADO";

export type PedidoListProps = {
  pedidos: Pedido[];
  loading: boolean;
  error: string;
  pedidoParaExcluir: string | null;
  isDeleting: boolean;
  filtroAtivo: FiltroPedido;
  onDeleteClick: (pedidoId: string) => void;
  onFilterChange: (tipo?: FiltroPedido) => void;
};

export type OrdenacaoPedido = "data_asc" | "data_desc";

export type PedidoTableProps = {
  pedidos: Pedido[];
  ordenacao: OrdenacaoPedido;
  filtroTipo: FiltroPedido;
  filtroStatus?: FiltroStatus;
  onOrdenarClick: () => void;
  onFilterChange: (
    tipo?: FiltroPedido,
    status?: FiltroStatus,
    ordem?: OrdenacaoPedido
  ) => void;
};

export type PedidoRowProps = {
  pedido: Pedido;
};

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

export interface ItensPedidoViewProps {
  itens: ItemPedido[];
  totalPedido: number;
}
