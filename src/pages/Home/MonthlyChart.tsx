import { MonthlyStock } from "./mockData";
import { useMemo } from "react";

interface MonthlyChartProps {
  monthlyStocks: MonthlyStock[];
  initialStock: number; // Adicione esta linha
  onMouseEnter: (
    month: MonthlyStock,
    index: number,
    e: React.MouseEvent
  ) => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  barWidth?: number;
  chartHeight?: number;
}

const MonthlyChart = ({
  monthlyStocks,
  initialStock, // Recebe a prop
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  barWidth = 20,
  chartHeight = 150,
}: MonthlyChartProps) => {
  // Pré-calcula os valores para otimização
  const barsData = useMemo(() => {
    return monthlyStocks.map((month, index) => {
      const prevMonth =
        index > 0 ? monthlyStocks[index - 1].stock : month.stock;
      const diff = month.stock - prevMonth;
      const totalMovement = month.purchases + month.sales;
      const purchasePercentage =
        totalMovement > 0 ? (month.purchases / totalMovement) * 100 : 0;
      const salesPercentage =
        totalMovement > 0 ? (month.sales / totalMovement) * 100 : 0;
      const stockPercentage = (prevMonth / (prevMonth + Math.abs(diff))) * 100;

      return {
        month,
        index,
        diff,
        purchasePercentage,
        salesPercentage,
        stockPercentage,
        monthName: new Date(2000, month.month - 1, 1).toLocaleString(
          "default",
          { month: "short" }
        ),
      };
    });
  }, [monthlyStocks]);

  // Encontra o valor máximo para normalização
  const maxValue = useMemo(() => {
    return Math.max(...monthlyStocks.map((m) => m.stock + m.purchases));
  }, [monthlyStocks]);

  return (
    <div className="flex flex-col">
      {/* Eixo Y (opcional) */}
      <div className="flex justify-end text-xs text-gray-500 mb-1 h-4">
        <span>{maxValue}</span>
      </div>

      {/* Gráfico principal */}
      <div
        className="flex items-end gap-2"
        style={{ height: `${chartHeight}px` }}
      >
        {barsData.map(({ month, index, diff, monthName }) => (
          <div
            key={index}
            className="flex flex-col items-center h-full relative group"
            onMouseEnter={(e) => onMouseEnter(month, index, e)}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
          >
            {/* Label do mês */}
            <div className="text-gray-600 text-xs mb-2">{monthName}</div>

            {/* Container das barras */}
            <div
              className="flex-1 flex flex-col-reverse relative w-full"
              style={{ width: `${barWidth}px` }}
            >
              {/* Barra de estoque (sempre visível) */}
              <div
                className="w-full bg-blue-500 opacity-70 transition-all duration-300 group-hover:opacity-100"
                style={{
                  height: `${(month.stock / maxValue) * 100}%`,
                }}
                aria-label={`Estoque: ${month.stock}`}
              ></div>

              {/* Barra de compras (se houver aumento) */}
              {diff > 0 && (
                <div
                  className="w-full absolute bottom-0 bg-green-500 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    height: `${(month.purchases / maxValue) * 100}%`,
                    bottom: `${(month.stock / maxValue) * 100}%`,
                  }}
                  aria-label={`Compras: +${month.purchases}`}
                ></div>
              )}

              {/* Barra de vendas (se houver redução) */}
              {diff < 0 && (
                <div
                  className="w-full absolute bg-red-500 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    height: `${(month.sales / maxValue) * 100}%`,
                    bottom: `${(month.stock / maxValue) * 100}%`,
                  }}
                  aria-label={`Vendas: -${month.sales}`}
                ></div>
              )}

              {/* Linha de referência (opcional) */}
              <div
                className="absolute top-0 left-0 right-0 border-t border-gray-300 border-dashed"
                style={{ top: `${100 - (initialStock / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyChart;
