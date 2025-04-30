import { useMemo } from "react";
import { MonthlyFinancialData } from "./types";
import StockTooltip from "./StockTooltip";
import { useState, useCallback } from "react";

const MonthlyFinancialChart = ({
  monthData,
}: {
  monthData: MonthlyFinancialData;
}) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    content: {
      title: "",
      items: [] as Array<{ label: string; value: string; color?: string }>,
    },
  });

  const maxValue = useMemo(() => {
    return Math.max(monthData.totalSales, monthData.totalPurchases) * 1.2; // 20% de margem
  }, [monthData]);

  const handleTooltipEnter = useCallback(
    (e: React.MouseEvent) => {
      setTooltip({
        visible: true,
        position: { x: e.clientX, y: e.clientY },
        content: {
          title: `Detalhes de ${new Date(
            2000,
            monthData.month - 1,
            1
          ).toLocaleString("pt-BR", { month: "long" })}`,
          items: [
            {
              label: "Total Vendas",
              value: monthData.totalSales.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }),
              color: "text-blue-400",
            },
            {
              label: "Total Compras",
              value: monthData.totalPurchases.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }),
              color: "text-red-400",
            },
            {
              label: "Lucro",
              value: monthData.profit.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }),
              color: monthData.profit >= 0 ? "text-green-400" : "text-red-400",
            },
          ],
        },
      });
    },
    [monthData]
  );

  const handleTooltipLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleTooltipMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => ({
      ...prev,
      position: { x: e.clientX, y: e.clientY },
    }));
  }, []);

  return (
    <div className="relative">
      <div
        className="flex items-end h-40 gap-4 mt-4"
        onMouseEnter={handleTooltipEnter}
        onMouseLeave={handleTooltipLeave}
        onMouseMove={handleTooltipMove}
      >
        {/* Barra de Vendas */}
        <div className="flex flex-col items-center flex-1">
          <div className="text-xs text-gray-500 mb-1">Vendas</div>
          <div
            className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
            style={{ height: `${(monthData.totalSales / maxValue) * 100}%` }}
          ></div>
        </div>

        {/* Barra de Compras */}
        <div className="flex flex-col items-center flex-1">
          <div className="text-xs text-gray-500 mb-1">Compras</div>
          <div
            className="w-full bg-red-500 rounded-t hover:bg-red-600 transition-colors"
            style={{
              height: `${(monthData.totalPurchases / maxValue) * 100}%`,
            }}
          ></div>
        </div>

        {/* Barra de Lucro */}
        <div className="flex flex-col items-center flex-1">
          <div className="text-xs text-gray-500 mb-1">Lucro</div>
          <div
            className={`w-full rounded-t hover:opacity-90 transition-colors ${
              monthData.profit >= 0 ? "bg-green-500" : "bg-red-500"
            }`}
            style={{
              height: `${(Math.abs(monthData.profit) / maxValue) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <StockTooltip
        visible={tooltip.visible}
        position={tooltip.position}
        content={tooltip.content}
      />
    </div>
  );
};

export default MonthlyFinancialChart;
