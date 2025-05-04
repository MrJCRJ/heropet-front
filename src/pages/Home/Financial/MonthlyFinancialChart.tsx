import { useMemo } from "react";
import { MonthlyFinancialData } from "../type/types";
import ChartContainer from "../Chart/ChartContainer";
import { generateAllMonthsData, calculateMaxValue } from "../Chart/chartUtils";

interface MonthlyFinancialChartProps {
  monthlyData: MonthlyFinancialData[];
  /** Ano para exibição no gráfico (padrão: ano atual) */
  year?: number;
}

/**
 * Componente para exibição de gráfico financeiro mensal
 *
 * @param monthlyData - Dados financeiros mensais (vendas, compras, lucro)
 * @param year - Ano a ser exibido no gráfico (opcional, padrão: ano atual)
 */
const MonthlyFinancialChart = ({
  monthlyData,
  year = new Date().getFullYear(),
}: MonthlyFinancialChartProps) => {
  // Pré-processamento dos dados (sempre executado)
  const { allMonthsData, maxValue, hasDataForYear } = useMemo(() => {
    const allMonths = generateAllMonthsData(monthlyData, year);
    const maxVal = calculateMaxValue(allMonths, monthlyData);
    const hasData = allMonths.some(
      (month) => month.totalSales > 0 || month.totalPurchases > 0
    );

    return {
      allMonthsData: allMonths,
      maxValue: maxVal,
      hasDataForYear: hasData,
    };
  }, [monthlyData, year]);

  // Validação de dados (após hooks)
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Nenhum dado disponível para o período
      </div>
    );
  }

  if (!hasDataForYear) {
    return (
      <div className="text-center py-4 text-gray-500">
        Nenhum dado financeiro disponível para {year}
      </div>
    );
  }

  return (
    <ChartContainer
      allMonthsData={allMonthsData}
      monthlyData={monthlyData}
      maxValue={maxValue}
    />
  );
};

export default MonthlyFinancialChart;
