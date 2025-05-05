// src/pages/Home/SalaryEvolution/SalaryChart.tsx
import { MonthlySalaryData } from "./types";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const SalaryChart = ({ data }: { data: MonthlySalaryData[] }) => (
  <div className="mt-8">
    <h3 className="text-lg font-medium text-gray-800 mb-4">
      Evolução do Montante Final
    </h3>
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-end h-64 gap-2">
        {data.map((monthData, index) => {
          const maxAmount = Math.max(...data.map((m) => m.finalAmount));
          const height = (monthData.finalAmount / maxAmount) * 100;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                style={{ height: `${height}%` }}
                title={`${monthData.month}: ${formatCurrency(monthData.finalAmount)}`}
              />
              <div className="text-xs text-gray-500 mt-1">
                {monthData.month.split(" ")[0]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default SalaryChart;