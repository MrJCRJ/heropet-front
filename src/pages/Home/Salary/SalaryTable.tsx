// src/pages/Home/SalaryEvolution/SalaryTable.tsx
import { MonthlySalaryData } from "./types";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

interface SalaryTableProps {
  data: MonthlySalaryData[];
}

const SalaryTable = ({ data }: SalaryTableProps) => (
  <div className="overflow-x-auto mb-8">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Mês
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Venda do mês
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Salário Vendedor
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Lucro
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gestor 1
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gestor 2
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Despesas
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ROI
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Montante final
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((monthData, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {monthData.month}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrency(monthData.sale)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrency(monthData.sellerSalary)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrency(monthData.profit)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrency(monthData.manager1)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrency(monthData.manager2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {monthData.expenses === 0
                ? "-"
                : formatCurrency(monthData.expenses)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {monthData.returnOnInvestment.toFixed(1)}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
              {formatCurrency(monthData.finalAmount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SalaryTable;
