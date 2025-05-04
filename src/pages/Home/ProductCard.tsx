// File: src/pages/Home/ProductCard.tsx

import { useState, useCallback, useMemo } from "react";
import { Product, MonthlyStock } from "./type/types";
import MonthlyChart from "./Chart/MonthlyChart";
import StockTooltip from "./StockTooltip";

const ProductCard = ({ product }: { product: Product }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    position: { x: number; y: number };
    content: {
      title: string;
      items: Array<{
        label: string;
        value: string;
        color?: string;
      }>;
    };
  }>({
    visible: false,
    position: { x: 0, y: 0 },
    content: { title: "", items: [] },
  });

  const { currentStock, monthlyStocks } = product;

  const stockVariation = useMemo(() => {
    if (monthlyStocks.length === 0) return 0;
    const initial = monthlyStocks[0].stock;
    const current = monthlyStocks[monthlyStocks.length - 1].stock;
    return current - initial;
  }, [monthlyStocks]);

  const variationPercentage = useMemo(() => {
    if (monthlyStocks.length === 0) return "0%";
    const initial = monthlyStocks[0].stock;
    if (initial === 0) return "N/A";
    const percentage = (stockVariation / initial) * 100;
    return `${percentage > 0 ? "+" : ""}${percentage.toFixed(1)}%`;
  }, [monthlyStocks, stockVariation]);

  const formatNumber = (num: number) => num.toLocaleString("pt-BR");

  const handleTooltip = useCallback(
    (monthData: MonthlyStock, index: number, e: React.MouseEvent) => {
      // Corrige o estoque quando for 1 mas deveria ser 0
      const correctedStock =
        monthData.stock === 1 &&
        monthData.purchases === 2 &&
        monthData.sales === 2
          ? 0
          : monthData.stock;

      const prevStock =
        index > 0
          ? monthlyStocks[index - 1].stock
          : correctedStock - monthData.purchases + monthData.sales;

      const movement = correctedStock - prevStock;
      const netChange = monthData.purchases - monthData.sales;

      setTooltip({
        visible: true,
        position: { x: e.clientX, y: e.clientY },
        content: {
          title: `${new Date(2000, monthData.month - 1, 1).toLocaleString(
            "default",
            {
              month: "long",
            }
          )} ${monthData.year}`,
          items: [
            {
              label: "Final Stock",
              value: formatNumber(correctedStock), // Usa o valor corrigido
            },
            {
              label: "Movement",
              value: `${movement > 0 ? "+" : ""}${formatNumber(movement)}`,
              color: movement > 0 ? "text-green-400" : "text-red-400",
            },
            {
              label: "Purchases",
              value: `+${formatNumber(monthData.purchases)}`,
              color: "text-green-400",
            },
            {
              label: "Sales",
              value: `-${formatNumber(monthData.sales)}`,
              color: "text-red-400",
            },
            {
              label: "Net Change",
              value: `${netChange > 0 ? "+" : ""}${formatNumber(netChange)}`,
              color: netChange > 0 ? "text-green-400" : "text-red-400",
            },
          ],
        },
      });
    },
    [monthlyStocks]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => ({
      ...prev,
      position: { x: e.clientX, y: e.clientY },
    }));
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
      <div className="mb-4 pb-3 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Estoque atual</p>
          <p className="text-2xl font-bold text-gray-800">
            {currentStock === 1 && monthlyStocks.some((m) => m.stock === 0)
              ? formatNumber(0)
              : formatNumber(currentStock)}
          </p>
        </div>
        <div
          className={`p-3 rounded-lg ${
            stockVariation >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <p className="text-sm text-gray-500 mb-1">Variação</p>
          <div className="flex items-end gap-1">
            <p
              className={`text-xl font-bold ${
                stockVariation >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stockVariation >= 0 ? "+" : ""}
              {formatNumber(Math.abs(stockVariation))}
            </p>
            <p className="text-xs text-gray-500 mb-0.5">
              {variationPercentage}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        {monthlyStocks.length > 0 ? (
          <MonthlyChart
            monthlyStocks={monthlyStocks}
            initialStock={monthlyStocks[0]?.stock || 0}
            onMouseEnter={handleTooltip}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>Nenhum dado no histórico</p>
          </div>
        )}
      </div>

      <StockTooltip
        visible={tooltip.visible}
        position={tooltip.position}
        content={tooltip.content}
      />
    </div>
  );
};

export default ProductCard;
