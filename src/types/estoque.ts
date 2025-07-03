// ======================================
// Seção 1: Tipos de Dados de Estoque
// ======================================

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

// ======================================
// Seção 2: Tipos para Operações de Estoque
// ======================================

export interface AtualizacaoEstoque {
  produtoId: string;
  quantidade: number;
  tipo: "ENTRADA" | "SAIDA";
  motivo?: string;
}

// ======================================
// Seção 3: Tipos para Relatórios de Estoque
// ======================================

export interface AlertaEstoqueMinimo {
  produtoId: string;
  nome: string;
  estoqueAtual: number;
  estoqueMinimo: number;
}
