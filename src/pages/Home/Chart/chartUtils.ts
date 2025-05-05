import { MonthlyFinancialData } from "../types/types";

/**
 * Gera dados para todos os meses do ano especificado, preenchendo com valores padrão
 * quando não houver dados reais para um mês específico.
 *
 * @param monthlyData - Dados financeiros existentes
 * @param year - Ano para o qual gerar os dados
 * @returns Array com 12 meses de dados financeiros
 */
export const generateAllMonthsData = (
  monthlyData: MonthlyFinancialData[],
  year: number
): MonthlyFinancialData[] => {
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const existingData = monthlyData.find(
      (m) => m.year === year && m.month === month
    );

    return (
      existingData || {
        month,
        year,
        totalSales: 0,
        totalPurchases: 0,
        profit: 0,
        transactions: [],
      }
    );
  });
};

/**
 * Calcula o valor máximo para escalar o gráfico apropriadamente
 *
 * @param allMonthsData - Todos os meses do ano (com dados reais ou padrão)
 * @param originalData - Dados financeiros originais (apenas meses com dados reais)
 * @returns Valor máximo ajustado para a escala do gráfico
 */
export const calculateMaxValue = (
  allMonthsData: MonthlyFinancialData[],
  originalData: MonthlyFinancialData[]
): number => {
  // Encontra meses que realmente têm dados (não os preenchidos com zeros)
  const monthsWithRealData = allMonthsData.filter((month) =>
    originalData.some(
      (data) => data.month === month.month && data.year === month.year
    )
  );

  // Se não houver dados, retorna um valor padrão mais significativo
  if (monthsWithRealData.length === 0) {
    return 1000; // Valor padrão mais adequado para valores financeiros
  }

  // Calcula os valores máximos
  const maxValues = {
    sales: Math.max(...monthsWithRealData.map((m) => m.totalSales)),
    purchases: Math.max(...monthsWithRealData.map((m) => m.totalPurchases)),
    profit: Math.max(...monthsWithRealData.map((m) => Math.abs(m.profit))),
  };

  // Retorna o maior valor com 20% de margem
  const absoluteMax = Math.max(
    maxValues.sales,
    maxValues.purchases,
    maxValues.profit
  );
  return Math.ceil(absoluteMax * 1.2);
};
