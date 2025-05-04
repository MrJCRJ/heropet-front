import { useState, useCallback } from "react";
import {
  MonthlyFinancialData,
  ActiveDataType,
  TooltipState,
  ChartContainerProps,
} from "../type/types";
import StockTooltip from "../Financial/FinancialTooltip";
import MonthColumn from "./MonthColumn";

// Utilitários de formatação
const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const getMonthName = (monthNumber: number) => {
  return new Date(2000, monthNumber - 1, 1).toLocaleString("pt-BR", {
    month: "long",
  });
};

const ChartContainer = ({
  allMonthsData,
  monthlyData,
  maxValue,
}: ChartContainerProps) => {
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<ActiveDataType>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    position: { x: 0, y: 0 },
    content: {
      title: "",
      items: [],
    },
  });

  const hasRealData = useCallback(
    (month: MonthlyFinancialData) => {
      return monthlyData.some(
        (m) => m.month === month.month && m.year === month.year
      );
    },
    [monthlyData]
  );

  const handleBarHover = useCallback(
    (
      monthIndex: number,
      type: "sales" | "purchases" | "profit",
      e: React.MouseEvent
    ) => {
      const month = allMonthsData[monthIndex];

      if (!hasRealData(month)) {
        return;
      }

      setActiveMonth(monthIndex);
      setActiveType(type);

      const tooltipItems = [
        {
          label: "Vendas",
          value: formatCurrency(month.totalSales),
          color: "text-blue-400",
        },
        {
          label: "Compras",
          value: formatCurrency(month.totalPurchases),
          color: "text-red-400",
        },
        {
          label: "Lucro",
          value: formatCurrency(month.profit),
          color: month.profit >= 0 ? "text-green-400" : "text-red-400",
        },
      ];

      setTooltip({
        visible: true,
        position: { x: e.clientX, y: e.clientY },
        content: {
          title: `${getMonthName(month.month)} ${month.year}`,
          items: [
            tooltipItems.find((item) => item.label.toLowerCase() === type) ||
              tooltipItems[0],
          ],
        },
      });
    },
    [allMonthsData, hasRealData]
  );

  const handleMouseLeave = useCallback(() => {
    setActiveMonth(null);
    setActiveType(null);
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => ({
      ...prev,
      position: { x: e.clientX, y: e.clientY },
    }));
  }, []);

  return (
    <div className="relative">
      <div
        className="flex h-64 mt-6 gap-1 overflow-x-auto pb-2"
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {allMonthsData.map((month, monthIndex) => (
          <MonthColumn
            key={`${month.year}-${month.month}`}
            month={month}
            monthIndex={monthIndex}
            hasData={hasRealData(month)}
            maxValue={maxValue}
            activeMonth={activeMonth}
            activeType={activeType}
            onBarHover={handleBarHover}
          />
        ))}
      </div>

      <StockTooltip
        visible={tooltip.visible}
        position={tooltip.position}
        content={tooltip.content}
      />
    </div>
  );
};

export default ChartContainer;
