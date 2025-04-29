// File: src/api/estoque.ts
import httpClient from "./httpClient";

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

export const getHistoricoEstoque = async (): Promise<EstoqueHistorico[]> => {
  const response = await httpClient.get("/estoque/historico");
  return response.data;
};
