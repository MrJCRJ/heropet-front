// File: src/api/estoque.ts
import httpClient from "./httpClient";

export interface EstoqueHistorico {
  produtoId: string;
  nome: string;
  estoqueAtual: number;
  historicoMensal: Array<{
    mes: number;
    ano: number;
    estoque: number;
    compras: number;
    vendas: number;
  }>;
}

export const getHistoricoEstoque = async (): Promise<EstoqueHistorico[]> => {
  const response = await httpClient.get("/estoque/historico");
  return response.data;
};
