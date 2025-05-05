import { Pedido } from "../../../api/pedidos";

export type FiltroPedido = "TODOS" | "VENDA" | "COMPRA";

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
