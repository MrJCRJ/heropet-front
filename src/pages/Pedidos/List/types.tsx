import { Pedido } from "../../Home/types/pedidos";

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
