import { useMemo } from "react";
import { MonthlyFinancialData } from "./types";
import ChartContainer from "./ChartContainer";
import { generateAllMonthsData, calculateMaxValue } from "./chartUtils";

const MonthlyFinancialChart = ({
  monthlyData,
  year = new Date().getFullYear(), // Ano atual como padrão
}: {
  monthlyData: MonthlyFinancialData[];
  year?: number;
}) => {
  const allMonthsData = useMemo(
    () => generateAllMonthsData(monthlyData, year),
    [monthlyData, year]
  );
  const maxValue = useMemo(
    () => calculateMaxValue(allMonthsData, monthlyData),
    [allMonthsData, monthlyData]
  );

  return (
    <ChartContainer
      allMonthsData={allMonthsData}
      monthlyData={monthlyData}
      maxValue={maxValue}
    />
  );
};

export default MonthlyFinancialChart;
