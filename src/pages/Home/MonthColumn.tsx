import { MonthlyFinancialData } from "./types";
import ChartBar from "./ChartBar";

const MonthColumn = ({
  month,
  monthIndex,
  hasData,
  maxValue,
  activeMonth,
  activeType,
  onBarHover,
}: {
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
}) => {
  const monthNames = [
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
  return (
    <div className="flex flex-col min-w-[50px]">
      <div
        className={`text-xs text-center mb-1 ${
          hasData ? "text-gray-600 font-medium" : "text-gray-400"
        }`}
      >
        {monthNames[month.month - 1]}
      </div>

      <div className="flex-1 flex items-end gap-1">
        <ChartBar
          type="sales"
          value={month.totalSales}
          monthIndex={monthIndex}
          hasData={hasData}
          maxValue={maxValue}
          activeMonth={activeMonth}
          activeType={activeType}
          onBarHover={onBarHover}
          colorClass={hasData ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-200"}
        />

        <ChartBar
          type="purchases"
          value={month.totalPurchases}
          monthIndex={monthIndex}
          hasData={hasData}
          maxValue={maxValue}
          activeMonth={activeMonth}
          activeType={activeType}
          onBarHover={onBarHover}
          colorClass={hasData ? "bg-red-500 hover:bg-red-600" : "bg-red-200"}
        />

        <ChartBar
          type="profit"
          value={Math.abs(month.profit)}
          monthIndex={monthIndex}
          hasData={hasData}
          maxValue={maxValue}
          activeMonth={activeMonth}
          activeType={activeType}
          onBarHover={onBarHover}
          colorClass={
            hasData
              ? month.profit >= 0
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
              : "bg-gray-200"
          }
        />
      </div>
    </div>
  );
};

export default MonthColumn;
