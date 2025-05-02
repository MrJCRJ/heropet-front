import { MonthlyFinancialData } from "./types";

export const generateAllMonthsData = (
  monthlyData: MonthlyFinancialData[],
  year: number
) => {
  // Cria array com todos os meses do ano especificado
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

export const calculateMaxValue = (
  allMonthsData: MonthlyFinancialData[],
  monthlyData: MonthlyFinancialData[]
) => {
  const monthsWithData = allMonthsData.filter((m) =>
    monthlyData.some((d) => d.month === m.month && d.year === m.year)
  );

  if (monthsWithData.length === 0) return 100;

  const maxSales = Math.max(...monthsWithData.map((m) => m.totalSales));
  const maxPurchases = Math.max(...monthsWithData.map((m) => m.totalPurchases));
  const maxProfit = Math.max(...monthsWithData.map((m) => Math.abs(m.profit)));
  return Math.max(maxSales, maxPurchases, maxProfit) * 1.2;
};
