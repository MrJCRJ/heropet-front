import { useMemo } from "react";
import { MonthlyChartProps } from "../types/types";

// Constantes para estilos e configurações
const DEFAULT_BAR_WIDTH = 28;
const DEFAULT_CHART_HEIGHT = 200;
const MARGIN_MULTIPLIER = 1.15;

const COLORS = {
  stock: "bg-blue-500",
  purchase: "bg-green-500",
  sale: "bg-red-500",
  monthLabel: "text-gray-700",
  valueLabel: "text-gray-600",
};

/**
 * Componente de gráfico mensal para visualização de estoque
 *
 * @param monthlyStocks - Dados mensais de estoque
 * @param initialStock - Valor inicial do estoque
 * @param onMouseEnter - Handler para evento de mouse enter
 * @param onMouseLeave - Handler para evento de mouse leave
 * @param onMouseMove - Handler para evento de mouse move
 * @param barWidth - Largura das barras (opcional)
 * @param chartHeight - Altura do gráfico (opcional)
 */
const MonthlyChart = ({
  monthlyStocks,
  initialStock,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  barWidth = DEFAULT_BAR_WIDTH,
  chartHeight = DEFAULT_CHART_HEIGHT,
}: MonthlyChartProps) => {
  // Pré-processamento dos dados
  const { barsData, maxValue } = useMemo(() => {
    const processedBars = monthlyStocks.map((month, index) => ({
      month,
      index,
      monthName: new Date(2000, month.month - 1, 1).toLocaleString("default", {
        month: "short",
      }),
    }));

    const maxPurchases = Math.max(...monthlyStocks.map((m) => m.purchases));
    const calculatedMaxValue =
      Math.max(maxPurchases, initialStock) * MARGIN_MULTIPLIER;

    return {
      barsData: processedBars,
      maxValue: calculatedMaxValue,
    };
  }, [monthlyStocks, initialStock]);

  // Componente de barra individual
  const renderBar = ({ month, index, monthName }: (typeof barsData)[0]) => {
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
        role="graphics-document"
        aria-label={`Dados de estoque para ${monthName}`}
      >
        {/* Label do mês */}
        <div className={`text-xs mb-2 ${COLORS.monthLabel}`}>{monthName}</div>

        {/* Container da barra */}
        <div
          className="flex-1 flex flex-col-reverse relative w-full"
          style={{ width: `${barWidth}px` }}
        >
          {/* Barra de estoque */}
          <div
            className={`w-full ${COLORS.stock} rounded-t`}
            style={{ height: `${stockHeight}%` }}
            aria-label={`Estoque: ${month.stock}`}
            role="graphics-symbol"
          />

          {/* Barra de vendas (se houver) */}
          {month.sales > 0 && (
            <div
              className={`w-full ${COLORS.sale} rounded-t`}
              style={{ height: `${salesHeight}%` }}
              aria-label={`Vendas: ${month.sales}`}
              role="graphics-symbol"
            />
          )}
        </div>

        {/* Legenda de valores */}
        <div className={`text-xs mt-1 ${COLORS.valueLabel}`}>
          <div>Total: {month.purchases}</div>
          <div className="text-red-600">Vendas: {month.sales}</div>
          <div className="text-blue-600">Estoque: {month.stock}</div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col w-full"
      role="region"
      aria-label="Gráfico mensal de estoque"
    >
      <div
        className="flex items-end gap-3 relative"
        style={{ height: `${chartHeight}px` }}
      >
        {barsData.map(renderBar)}
      </div>
    </div>
  );
};

export default MonthlyChart;
