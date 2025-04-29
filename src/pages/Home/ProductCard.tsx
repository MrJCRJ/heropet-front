// File: src/pages/Home/ProductCard/index.tsx

import { useState, useCallback, useMemo } from "react";
import { MockProduct } from "./mockData";
import MonthlyChart from "./MonthlyChart";
import StockTooltip from "./StockTooltip";

const ProductCard = ({ product }: { product: MockProduct }) => {
  // Corrigindo os warnings do ESLint com useMemo
  const safeMonthlyStocks = useMemo(
    () =>
      product?.monthlyStocks ||
      Array(12).fill({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        stock: 0,
        purchases: 0,
        sales: 0,
      }),
    [product?.monthlyStocks]
  );

  const hasData = useMemo(
    () =>
      safeMonthlyStocks.length > 0 &&
      safeMonthlyStocks.some((m) => m.purchases > 0 || m.sales > 0),
    [safeMonthlyStocks]
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  // Dados calculados com fallbacks
  const { currentStock, initialStock, variation } = useMemo(() => {
    const current = hasData
      ? safeMonthlyStocks[safeMonthlyStocks.length - 1].stock
      : 0;
    const initial = product?.initialStock || 0;
    return {
      currentStock: current,
      initialStock: initial,
      variation: current - initial,
    };
  }, [hasData, safeMonthlyStocks, product?.initialStock]);

  // Formatação de valores
  const formatNumber = (num: number) => num.toLocaleString("pt-BR");
  const variationColor = variation >= 0 ? "text-green-600" : "text-red-600";
  const variationSign = variation >= 0 ? "+" : "";

  // Handlers otimizados com useCallback
  const handleTooltip = useCallback(
    (
      month: (typeof safeMonthlyStocks)[0],
      index: number,
      e: React.MouseEvent
    ) => {
      if (!hasData) return;

      const prevMonth =
        index > 0 ? safeMonthlyStocks[index - 1].stock : month.stock;
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
    [hasData, safeMonthlyStocks]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  }, []);

  if (!product) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <p>Produto não disponível</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Cabeçalho */}
      <div className="mb-5 pb-3 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">
          {product?.name || "Produto sem nome"}
        </h3>
        {/* Adicionei para debug */}
        <p className="text-xs text-gray-400">
          {hasData
            ? `${safeMonthlyStocks.length} meses de dados`
            : "Sem dados históricos"}
        </p>
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
        {hasData ? (
          <MonthlyChart
            monthlyStocks={safeMonthlyStocks}
            initialStock={initialStock}
            onMouseEnter={handleTooltip}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            barWidth={24}
            chartHeight={180}
          />
        ) : (
          <div className="h-[180px] flex items-center justify-center text-gray-400">
            Dados de estoque não disponíveis
          </div>
        )}
      </div>

      {/* Tooltip */}
      {hasData && (
        <StockTooltip
          tooltip={tooltip}
          offset={{ x: 15, y: 15 }}
          maxWidth={280}
        />
      )}
    </div>
  );
};

export default ProductCard;
