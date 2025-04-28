import { useState, useCallback, useMemo } from "react";
import { MockProduct } from "../mockData";
import MonthlyChart from "../MonthlyChart";
import StockTooltip from "../StockTooltip";

const ProductCard = ({ product }: { product: MockProduct }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  // Dados calculados
  const { currentStock, initialStock, variation } = useMemo(() => {
    const current =
      product.monthlyStocks[product.monthlyStocks.length - 1].stock;
    const initial = product.initialStock;
    return {
      currentStock: current,
      initialStock: initial,
      variation: current - initial,
    };
  }, [product]);

  // Formatação de valores
  const formatNumber = (num: number) => num.toLocaleString("pt-BR");
  const variationColor = variation >= 0 ? "text-green-600" : "text-red-600";
  const variationSign = variation >= 0 ? "+" : "";

  // Handlers otimizados com useCallback
  const handleTooltip = useCallback(
    (
      month: (typeof product.monthlyStocks)[0],
      index: number,
      e: React.MouseEvent
    ) => {
      const prevMonth =
        index > 0 ? product.monthlyStocks[index - 1].stock : month.stock;
      const diff = month.stock - prevMonth;
      const totalMovement = month.purchases + month.sales;
      const purchasePercentage =
        totalMovement > 0 ? (month.purchases / totalMovement) * 100 : 0;
      const salesPercentage =
        totalMovement > 0 ? (month.sales / totalMovement) * 100 : 0;

      setTooltip({
        visible: true,
        content: `
          Mês: ${new Date(2000, month.month - 1, 1).toLocaleString("default", {
            month: "long",
          })}/${month.year}
          Estoque Final: ${formatNumber(month.stock)}
          ${
            diff > 0
              ? `Comprou: +${formatNumber(diff)}`
              : `Vendeu: ${formatNumber(diff)}`
          }
          Compras: +${formatNumber(
            month.purchases
          )} (${purchasePercentage.toFixed(1)}%)
          Vendas: -${formatNumber(month.sales)} (${salesPercentage.toFixed(1)}%)
          Variação: ${
            month.purchases - month.sales > 0 ? "+" : ""
          }${formatNumber(month.purchases - month.sales)}
        `,
        x: e.clientX,
        y: e.clientY,
      });
    },
    [product]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Cabeçalho */}
      <div className="mb-5 pb-3 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <span className="text-sm text-gray-500">{product.brand}</span>
      </div>

      {/* Resumo do Estoque */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Estoque Atual</p>
          <p className="text-2xl font-bold text-gray-800">
            {formatNumber(currentStock)}
          </p>
        </div>

        <div
          className={`text-center p-3 rounded-lg ${
            variation >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <p className={`text-lg font-bold ${variationColor}`}>
            {variationSign}
            {formatNumber(variation)}
          </p>
          <p className="text-xs text-gray-500">desde o início</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mb-2">
        <MonthlyChart
          monthlyStocks={product.monthlyStocks}
          initialStock={initialStock}
          onMouseEnter={handleTooltip}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          barWidth={24}
          chartHeight={180}
        />
      </div>

      {/* Tooltip */}
      <StockTooltip
        tooltip={tooltip}
        offset={{ x: 15, y: 15 }}
        maxWidth={280}
      />
    </div>
  );
};

export default ProductCard;
