// File: src/pages/Home/mockData.ts
import { getHistoricoEstoque } from "../../api/estoque";

export interface MonthlyStock {
  month: number;
  year: number;
  stock: number;
  purchases: number;
  sales: number;
}

export interface Product {
  id: string;
  name: string;
  currentStock: number;
  monthlyStocks: MonthlyStock[];
}

export const generateRealStockData = async (): Promise<Product[]> => {
  try {
    const response = await getHistoricoEstoque();

    return response.map((produto) => ({
      id: produto.produtoId,
      name: produto.nome,
      currentStock: produto.estoqueAtual,
      monthlyStocks: produto.historicoMensal.map((item) => ({
        month: item.mes,
        year: item.ano,
        stock: item.estoque,
        purchases: item.compras,
        sales: item.vendas,
      })),
    }));
  } catch (error) {
    console.error("Erro ao carregar estoque:", error);
    return [];
  }
};

export const mockProducts = generateRealStockData();
