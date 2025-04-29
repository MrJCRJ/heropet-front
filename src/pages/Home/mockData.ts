// File: src/pages/Home/mockData.ts
import { getHistoricoEstoque } from "../../api/estoque";

export interface MonthlyStock {
  month: number;
  year: number;
  stock: number;
  purchases: number;
  sales: number;
}

export interface MockProduct {
  id: number;
  name: string;
  initialStock: number;
  monthlyStocks: MonthlyStock[];
}

export const generateRealStockData = async (): Promise<MockProduct[]> => {
  try {
    const response = await getHistoricoEstoque();

    return response.map((produto, index) => ({
      id: index + 1,
      name: produto.nome,
      initialStock: produto.historicoMensal[0]?.estoque || 0,
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
