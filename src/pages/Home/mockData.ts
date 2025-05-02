// File: src/pages/Home/mockData.ts

import { getHistoricoEstoque } from "../../api/estoque";
import { Product } from "./types";
import { MonthlyStockData } from "../../api/estoque";

const validateStockData = (
  monthlyData: MonthlyStockData[]
): MonthlyStockData[] => {
  return monthlyData.map((item, index) => {
    // Corrige estoque quando compras == vendas e estoque == 1
    if (item.compras === item.vendas && item.estoque === 1) {
      return { ...item, estoque: 0 };
    }

    // Validação adicional para garantir consistência
    const calculatedStock =
      index > 0
        ? monthlyData[index - 1].estoque + item.compras - item.vendas
        : item.estoque;

    if (Math.abs(calculatedStock - item.estoque) > 1) {
      console.warn(
        `Inconsistência no estoque do mês ${item.mes}: esperado ${calculatedStock}, encontrado ${item.estoque}`
      );
      return { ...item, estoque: calculatedStock };
    }

    return item;
  });
};

export const generateRealStockData = async (): Promise<Product[]> => {
  try {
    const response = await getHistoricoEstoque();

    return response.map((produto) => {
      const validatedMonthlyStocks = validateStockData(produto.historicoMensal);

      // Corrige o estoque atual se necessário
      const lastMonthStock =
        validatedMonthlyStocks[validatedMonthlyStocks.length - 1]?.estoque;
      const currentStock =
        produto.estoqueAtual === 1 && lastMonthStock === 0
          ? 0
          : produto.estoqueAtual;

      return {
        id: produto.produtoId,
        name: produto.nome,
        currentStock,
        monthlyStocks: validatedMonthlyStocks.map((item) => ({
          month: item.mes,
          year: item.ano,
          stock: item.estoque,
          purchases: item.compras,
          sales: item.vendas,
        })),
      };
    });
  } catch (error) {
    console.error("Erro ao carregar estoque:", error);
    return [];
  }
};

export const mockProducts = generateRealStockData();
