import { Pedido } from "../../../types";

export interface EstoqueSummaryProps {
  pedidos: Pedido[];
}

export interface ProdutoResumo {
  nome: string;
  quantidade: number;
  precoUnitario: number;
  valorTotal: number;
  vendas: number;
}
