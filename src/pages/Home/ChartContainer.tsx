import { useState, useCallback } from "react";
import { MonthlyFinancialData } from "./types";
import StockTooltip from "./StockTooltip";
import MonthColumn from "./MonthColumn";

const ChartContainer = ({
  allMonthsData,
  monthlyData,
  maxValue,
}: {
  allMonthsData: MonthlyFinancialData[];
  monthlyData: MonthlyFinancialData[];
  maxValue: number;
}) => {
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<
    "sales" | "purchases" | "profit" | null
  >(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    content: {
      title: "",
      items: [] as Array<{ label: string; value: string; color?: string }>,
    },
  });

  const handleBarHover = useCallback(
    (
      monthIndex: number,
      type: "sales" | "purchases" | "profit",
      e: React.MouseEvent
    ) => {
      const month = allMonthsData[monthIndex];

      if (
        !monthlyData.some(
          (m) => m.month === month.month && m.year === month.year
        )
      ) {
        return;
      }

      setActiveMonth(monthIndex);
      setActiveType(type);

      const items = [
        {
          label: "Vendas",
          value: month.totalSales.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          color: "text-blue-400",
        },
        {
          label: "Compras",
          value: month.totalPurchases.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          color: "text-red-400",
        },
        {
          label: "Lucro",
          value: month.profit.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          color: month.profit >= 0 ? "text-green-400" : "text-red-400",
        },
      ];

      setTooltip({
        visible: true,
        position: { x: e.clientX, y: e.clientY },
        content: {
          title: `${new Date(2000, month.month - 1, 1).toLocaleString("pt-BR", {
            month: "long",
          })} ${month.year}`,
          items: [
            items.find((item) => item.label.toLowerCase() === type) || items[0],
          ],
        },
      });
    },
    [allMonthsData, monthlyData]
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
            hasData={monthlyData.some(
              (m) => m.month === month.month && m.year === month.year
            )}
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
