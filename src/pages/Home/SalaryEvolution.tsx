import { useState } from "react";

type MonthlySalaryData = {
  month: string;
  sale: number;
  sellerSalary: number;
  percentage: number;
  profit: number;
  manager1: number;
  manager2: number;
  expenses: number;
  finalAmount: number;
};

const SalaryEvolution = () => {
  // Dados de exemplo (você pode substituir por dados da API)
  const [salaryData, setSalaryData] = useState<MonthlySalaryData[]>([
    {
      month: "Janeiro 2023",
      sale: 2540.0,
      sellerSalary: 177.8,
      percentage: 631.0,
      profit: 453.2,
      manager1: 113.3,
      manager2: 113.3,
      expenses: 0,
      finalAmount: 226.6,
    },
    {
      month: "Fevereiro 2023",
      sale: 2800.0,
      sellerSalary: 196.0,
      percentage: 695.0,
      profit: 499.8,
      manager1: 124.95,
      manager2: 124.95,
      expenses: 50.0,
      finalAmount: 249.9,
    },
    // Adicione mais meses conforme necessário
  ]);

  // Formata valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
        Evolução da Folha Salarial
      </h2>

      <div className="overflow-x-auto">
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
                %
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
                Montante final
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaryData.map((monthData, index) => (
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
                  {formatCurrency(monthData.percentage)}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                  {formatCurrency(monthData.finalAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfico de evolução */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Evolução do Montante Final
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-end h-64 gap-2">
            {salaryData.map((monthData, index) => {
              const maxAmount = Math.max(
                ...salaryData.map((m) => m.finalAmount)
              );
              const height = (monthData.finalAmount / maxAmount) * 100;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${height}%` }}
                    title={`${monthData.month}: ${formatCurrency(
                      monthData.finalAmount
                    )}`}
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
    </div>
  );
};

export default SalaryEvolution;
