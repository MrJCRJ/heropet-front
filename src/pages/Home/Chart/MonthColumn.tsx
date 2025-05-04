import { MonthlyFinancialData } from "../type/types";
import ChartBar from "./ChartBar";

interface MonthColumnProps {
  month: MonthlyFinancialData;
  monthIndex: number;
  hasData: boolean;
  maxValue: number;
  activeMonth: number | null;
  activeType: "sales" | "purchases" | "profit" | null;
  onBarHover: (
    monthIndex: number,
    type: "sales" | "purchases" | "profit",
    e: React.MouseEvent
  ) => void;
}

type BarType = "sales" | "purchases" | "profit";

const MONTH_NAMES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const MonthColumn = ({
  month,
  monthIndex,
  hasData,
  maxValue,
  activeMonth,
  activeType,
  onBarHover,
}: MonthColumnProps) => {
  const getBarColor = (type: BarType) => {
    if (!hasData) {
      return type === "sales"
        ? "bg-blue-200"
        : type === "purchases"
        ? "bg-red-200"
        : "bg-gray-200";
    }

    switch (type) {
      case "sales":
        return "bg-blue-500 hover:bg-blue-600";
      case "purchases":
        return "bg-red-500 hover:bg-red-600";
      case "profit":
        return month.profit >= 0
          ? "bg-green-500 hover:bg-green-600"
          : "bg-red-500 hover:bg-red-600";
    }
  };

  const getBarValue = (type: BarType) => {
    switch (type) {
      case "sales":
        return month.totalSales;
      case "purchases":
        return month.totalPurchases;
      case "profit":
        return Math.abs(month.profit);
    }
  };

  return (
    <div className="flex flex-col min-w-[50px]">
      <div
        className={`text-xs text-center mb-1 ${
          hasData ? "text-gray-600 font-medium" : "text-gray-400"
        }`}
      >
        {MONTH_NAMES[month.month - 1]}
      </div>

      <div className="flex-1 flex items-end gap-1">
        {(["sales", "purchases", "profit"] as BarType[]).map((type) => (
          <ChartBar
            key={type}
            type={type}
            value={getBarValue(type)}
            monthIndex={monthIndex}
            hasData={hasData}
            maxValue={maxValue}
            activeMonth={activeMonth}
            activeType={activeType}
            onBarHover={onBarHover}
            colorClass={getBarColor(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default MonthColumn;
