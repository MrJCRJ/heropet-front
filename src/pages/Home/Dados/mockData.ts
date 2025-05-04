// File: src/pages/Home/mockData.ts
import { getHistoricoEstoque } from "../../../api/estoque";
import { Product, MonthlyStock } from "../type/types";
import { MonthlyStockData } from "../../../api/estoque";

/**
 * Valida e corrige dados mensais de estoque
 * @param monthlyData Dados mensais de estoque a serem validados
 * @returns Dados validados e corrigidos
 */
const validateStockData = (
  monthlyData: MonthlyStockData[]
): MonthlyStockData[] => {
  if (!monthlyData || !Array.isArray(monthlyData)) {
    console.warn("Dados mensais inválidos - array esperado");
    return [];
  }

  return monthlyData.map((item, index) => {
    // Validação básica dos campos obrigatórios
    if (
      typeof item.mes !== "number" ||
      typeof item.ano !== "number" ||
      typeof item.estoque !== "number" ||
      typeof item.compras !== "number" ||
      typeof item.vendas !== "number"
    ) {
      console.warn(`Dados inválidos no mês ${item.mes}/${item.ano}`);
      return {
        mes: item.mes || 0,
        ano: item.ano || 0,
        estoque: 0,
        compras: 0,
        vendas: 0,
      };
    }

    // Correção de estoque quando compras == vendas e estoque == 1
    if (item.compras === item.vendas && item.estoque === 1) {
      return { ...item, estoque: 0 };
    }

    // Cálculo de estoque esperado
    const calculatedStock =
      index > 0
        ? monthlyData[index - 1].estoque + item.compras - item.vendas
        : item.estoque;

    // Verificação de consistência
    if (Math.abs(calculatedStock - item.estoque) > 1) {
      console.warn(
        `Inconsistência no estoque do mês ${item.mes}/${item.ano}: ` +
          `esperado ${calculatedStock}, encontrado ${item.estoque}`
      );
      return { ...item, estoque: calculatedStock };
    }

    return item;
  });
};

/**
 * Obtém e processa dados reais de estoque da API
 * @returns Promise com array de produtos formatados
 */
export const fetchStockData = async (): Promise<Product[]> => {
  try {
    const response = await getHistoricoEstoque();

    if (!response || !Array.isArray(response)) {
      console.warn("Resposta da API inválida");
      return [];
    }

    return response.map((produto) => {
      if (!produto.historicoMensal || !Array.isArray(produto.historicoMensal)) {
        console.warn(
          `Produto ${produto.produtoId} sem histórico mensal válido`
        );
        return {
          id: produto.produtoId || "",
          name: produto.nome || "Produto sem nome",
          currentStock: 0,
          monthlyStocks: [],
        };
      }

      const validatedMonthlyStocks = validateStockData(produto.historicoMensal);
      const lastMonthStock =
        validatedMonthlyStocks[validatedMonthlyStocks.length - 1]?.estoque || 0;

      // Correção do estoque atual
      const currentStock =
        produto.estoqueAtual === 1 &&
        lastMonthStock === 0 &&
        produto.historicoMensal.slice(-1)[0]?.compras ===
          produto.historicoMensal.slice(-1)[0]?.vendas
          ? 0
          : produto.estoqueAtual || 0;

      return {
        id: produto.produtoId,
        name: produto.nome,
        currentStock,
        monthlyStocks: validatedMonthlyStocks.map(
          (item): MonthlyStock => ({
            month: item.mes,
            year: item.ano,
            stock: item.estoque,
            purchases: item.compras,
            sales: item.vendas,
          })
        ),
      };
    });
  } catch (error) {
    console.error("Erro ao carregar dados de estoque:", error);
    return [];
  }
};

// Exporta diretamente a Promise para uso em desenvolvimento
export const mockProducts = fetchStockData();
