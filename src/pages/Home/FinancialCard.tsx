import { useMemo } from "react";
import { MonthlyFinancialData } from "./types";
import MonthlyFinancialChart from "./MonthlyFinancialChart.tsx";

const FinancialCard = ({ monthData }: { monthData: MonthlyFinancialData }) => {
  const monthName = useMemo(() => {
    return new Date(2000, monthData.month - 1, 1).toLocaleString("pt-BR", {
      month: "long",
    });
  }, [monthData.month]);

  const profitPercentage = useMemo(() => {
    if (monthData.totalPurchases === 0) return "N/A";
    const percentage = (monthData.profit / monthData.totalPurchases) * 100;
    return `${percentage > 0 ? "+" : ""}${percentage.toFixed(1)}%`;
  }, [monthData]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="mb-4 pb-3 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          {monthName} {monthData.year}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Vendas</p>
          <p className="text-xl font-bold text-blue-600">
            {monthData.totalSales.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Compras</p>
          <p className="text-xl font-bold text-red-600">
            {monthData.totalPurchases.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <div
          className={`p-3 rounded-lg ${
            monthData.profit >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <p className="text-sm text-gray-500 mb-1">
            Lucro ({profitPercentage})
          </p>
          <p
            className={`text-xl font-bold ${
              monthData.profit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {monthData.profit.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      <MonthlyFinancialChart monthData={monthData} />
    </div>
  );
};

export default FinancialCard;
