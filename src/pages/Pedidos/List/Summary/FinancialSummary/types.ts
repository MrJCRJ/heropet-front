import { Pedido, FiltroPedido } from "../../../types";

export interface FinancialSummaryProps {
  pedidos: Pedido[];
  filtroTipo: FiltroPedido;
}

export interface ConsolidatedResultProps {
  saldoGeral: number;
  saldoOperacoes: number;
  saldoCustos: number;
  totalVendas: number;
  totalInvestimentos: number;
  totalCompras: number;
  totalDespesas: number;
}

export interface OrderBalanceProps {
  total: number;
  totalVendas: number;
  totalCompras: number;
}

export interface PendingReceivablesProps {
  totalAReceber: number;
}

export interface PendingPayablesProps {
  totalAPagar: number;
}

export interface Financa {
  id: string;
  tipo: "Investimento" | "Despesa";
  valor: number;
  data: string;
  descricao: string;
  // ... outros campos conforme necessário
}
