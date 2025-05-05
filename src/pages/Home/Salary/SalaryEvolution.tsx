// src/pages/Home/SalaryEvolution/SalaryEvolution.tsx
import { useState, useMemo } from "react";
import { INITIAL_DATA, LEGEND_ITEMS } from "./constants";
import {
  formatCurrency,
  calculateProjections,
  calculateSalesTarget,
} from "./utils";
import SalaryTable from "./SalaryTable";
import SalaryChart from "./SalaryChart";
import MetricsDashboard from "./MetricsDashboard";

const SalaryEvolution = () => {
  const salesTarget = useMemo(
    () => calculateSalesTarget(INITIAL_DATA.investment.total),
    []
  );
  const [salaryData] = useState(() =>
    calculateProjections(INITIAL_DATA, salesTarget)
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
        Projeção Financeira 2025 (Ajustada)
      </h2>

      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
        <h3 className="font-medium text-yellow-800">Dados Reais Informados:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
          <li>
            <strong>Investimento total</strong>:{" "}
            {formatCurrency(INITIAL_DATA.investment.total)}
          </li>
          <li>
            <strong>J.Cicero</strong>:{" "}
            {formatCurrency(INITIAL_DATA.investment.you)}
          </li>
          <li>
            <strong>I.Jonathan</strong>:{" "}
            {formatCurrency(INITIAL_DATA.investment.partner)}
          </li>
          <li>
            <strong>Compra de rações</strong>:{" "}
            {formatCurrency(1954 + 2000 + 1485)}
          </li>
          <li>
            <strong>Impressora (maio)</strong>:{" "}
            {formatCurrency(INITIAL_DATA.investment.printer)}
          </li>
          <li>
            <strong>Lucro abril</strong>:{" "}
            {formatCurrency(INITIAL_DATA.aprilProfit)}
          </li>
        </ul>
      </div>

      <MetricsDashboard data={salaryData} initialData={INITIAL_DATA} />
      <SalaryTable data={salaryData} />
      <SalaryChart data={salaryData} />

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800">Legenda dos Dados:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
          {LEGEND_ITEMS.map((item, index) => (
            <li key={index}>
              <strong>{item.term}</strong>: {item.definition}
            </li>
          ))}
          <li>
            <strong>Meta</strong>: R${salesTarget.toFixed(2)}/mês (para
            recuperar investimento em 6 meses)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SalaryEvolution;
