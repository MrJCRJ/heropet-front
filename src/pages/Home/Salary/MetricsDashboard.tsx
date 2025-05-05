// src/pages/Home/SalaryEvolution/MetricsDashboard.tsx
import { MonthlySalaryData } from "./types";
import Tooltip from "../../../components/Tooltip"; // Assumindo que você tem um componente Tooltip

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

interface MetricsDashboardProps {
  data: MonthlySalaryData[];
  initialData: {
    investment: {
      you: number;
      partner: number;
      total: number;
      printer: number;
    };
  };
}

const MetricsDashboard = ({ data, initialData }: MetricsDashboardProps) => {
  // Corrigido: annualProjection já é o valor total acumulado
  const annualProjection = data.reduce(
    (sum, month) => sum + month.finalAmount,
    0
  );
  const totalExpenses = data.reduce((sum, m) => sum + m.expenses, 0);
  const avgROI =
    data.reduce((sum, month) => sum + month.returnOnInvestment, 0) /
    data.length;
  const currentMonth = data[0];
  const achievementPercentage = (
    (currentMonth.sale / currentMonth.salesTarget) *
    100
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Investimento Total */}
      <div className="bg-green-50 p-3 rounded border border-green-100 relative group">
        <Tooltip content="Valor total investido no negócio, incluindo sua parte e a do sócio">
          <p className="text-sm text-green-800">Investimento Total</p>
        </Tooltip>
        <p className="font-bold text-lg">
          {formatCurrency(initialData.investment.total)}
        </p>
        <p className="text-xs mt-1 text-green-600">
          (J.Cicero: {formatCurrency(initialData.investment.you)} | I.Jonathan:{" "}
          {formatCurrency(initialData.investment.partner)})
        </p>
      </div>

      {/* Meta Mensal */}
      <div className="bg-blue-50 p-3 rounded border border-blue-100 relative group">
        <Tooltip
          content={
            <div>
              <p>Meta calculada para recuperar o investimento em 6 meses:</p>
              <ul className="list-disc pl-4 mt-1">
                <li>Investimento total × 1.2 (margem de segurança)</li>
                <li>Dividido por 6 meses</li>
                <li>
                  Atual: {currentMonth.sale} / {currentMonth.salesTarget}
                </li>
              </ul>
            </div>
          }
        >
          <p className="text-sm text-blue-800">Meta Mensal</p>
        </Tooltip>
        <p className="font-bold text-lg">
          {formatCurrency(currentMonth.salesTarget)}
        </p>
        <p className="text-xs mt-1 text-blue-600">
          {achievementPercentage}% em {currentMonth.month.split(" ")[0]}
        </p>
      </div>

      {/* Retorno Médio (ROI) */}
      <div className="bg-purple-50 p-3 rounded border border-purple-100 relative group">
        <Tooltip content="Retorno sobre Investimento médio mensal: (Lucro / Investimento Total) × 100">
          <p className="text-sm text-purple-800">Retorno Médio (ROI)</p>
        </Tooltip>
        <p className="font-bold text-lg">{avgROI.toFixed(1)}%</p>
        <p className="text-xs mt-1 text-purple-600">
          Projeção anual: {formatCurrency(annualProjection)}{" "}
          {/* Corrigido: removido .finalAmount */}
        </p>
      </div>

      {/* Despesas Totais */}
      <div className="bg-amber-50 p-3 rounded border border-amber-100 relative group">
        <Tooltip content="Total de despesas acumuladas, incluindo custos fixos e variáveis">
          <p className="text-sm text-amber-800">Despesas Totais</p>
        </Tooltip>
        <p className="font-bold text-lg">{formatCurrency(totalExpenses)}</p>
        <p className="text-xs mt-1 text-amber-600">
          Incluindo impressora: {formatCurrency(initialData.investment.printer)}
        </p>
      </div>
    </div>
  );
};

export default MetricsDashboard;
