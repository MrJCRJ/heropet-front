export interface MonthlyStockData {
  mes: number;
  ano: number;
  estoque: number;
  compras: number;
  vendas: number;
}

export interface EstoqueHistorico {
  produtoId: string;
  nome: string;
  estoqueAtual: number;
  historicoMensal: MonthlyStockData[];
}
