// File: src/pages/Home/MonthlyChart.tsx

import { useMemo } from "react";
import { MonthlyChartProps } from "./types";

const MonthlyChart = ({
  monthlyStocks,
  initialStock,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  barWidth = 28,
  chartHeight = 200,
}: MonthlyChartProps) => {
  // Pré-calcula os valores para otimização
  const barsData = useMemo(() => {
    return monthlyStocks.map((month, index) => {
      return {
        month,
        index,
        monthName: new Date(2000, month.month - 1, 1).toLocaleString(
          "default",
          {
            month: "short",
          }
        ),
      };
    });
  }, [monthlyStocks]);

  // Calcula o valor máximo baseado no maior purchases
  const maxValue = useMemo(() => {
    const maxPurchases = Math.max(...monthlyStocks.map((m) => m.purchases));
    return Math.max(maxPurchases, initialStock) * 1.15; // 15% de margem
  }, [monthlyStocks, initialStock]);

  // Cores consistentes
  const colors = {
    stock: "bg-blue-500",
    purchase: "bg-green-500",
    sale: "bg-red-500",
    monthLabel: "text-gray-700",
    valueLabel: "text-gray-600",
  };

  return (
    <div className="flex flex-col w-full">
      {/* Eixo Y com valores */}

      {/* Gráfico principal */}
      <div
        className="flex items-end gap-3 relative"
        style={{ height: `${chartHeight}px` }}
      >
        {barsData.map(({ month, index, monthName }) => {
          const totalHeight = (month.purchases / maxValue) * 100;
          const salesHeight = (month.sales / maxValue) * 100;
          const stockHeight = totalHeight - salesHeight;

          return (
            <div
              key={index}
              className="flex flex-col items-center h-full relative group"
              onMouseEnter={(e) => onMouseEnter(month, index, e)}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMove}
            >
              {/* Label do mês */}
              <div className={`text-xs mb-2 ${colors.monthLabel}`}>
                {monthName}
              </div>

              {/* Container da barra completa */}
              <div
                className="flex-1 flex flex-col-reverse relative w-full"
                style={{ width: `${barWidth}px` }}
              >
                {/* Parte de stock (azul) */}
                <div
                  className={`w-full ${colors.stock} rounded-t`}
                  style={{
                    height: `${stockHeight}%`,
                  }}
                  aria-label={`Estoque: ${month.stock}`}
                ></div>

                {/* Parte de vendas (vermelha) */}
                {month.sales > 0 && (
                  <div
                    className={`w-full ${colors.sale} rounded-t`}
                    style={{
                      height: `${salesHeight}%`,
                    }}
                    aria-label={`Vendas: ${month.sales}`}
                  ></div>
                )}
              </div>

              {/* Valores abaixo da barra */}
              <div className={`text-xs mt-1 ${colors.valueLabel}`}>
                <div>Total: {month.purchases}</div>
                <div className="text-red-600">Vendas: {month.sales}</div>
                <div className="text-blue-600">Estoque: {month.stock}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyChart;
