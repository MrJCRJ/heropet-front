import { TooltipGenerico } from "./TooltipGenerico";
import { FinancialValueDisplay } from "./FinancialValueDisplay";
import { ConsolidatedResultTooltip } from "./ConsolidatedResultTooltip";
import { ConsolidatedResultProps } from "../pages/Pedidos/List/Summary/FinancialSummary/types";
import { formatarMoeda } from "../utils/currency";

export const ConsolidatedResult = ({
  saldoGeral,
  saldoOperacoes,
  saldoCustos,
  totalVendas,
  totalInvestimentos,
  totalCompras,
  totalDespesas,
}: ConsolidatedResultProps) => {
  return (
    <div
      className={`p-4 rounded-lg col-span-3 ${
        saldoGeral >= 0 ? "bg-blue-50" : "bg-orange-50"
      }`}
    >
      <TooltipGenerico
        conteudo={
          <ConsolidatedResultTooltip
            totalVendas={totalVendas}
            totalInvestimentos={totalInvestimentos}
            totalCompras={totalCompras}
            totalDespesas={totalDespesas}
            saldoOperacoes={saldoOperacoes}
            saldoCustos={saldoCustos}
            saldoGeral={saldoGeral}
          />
        }
        icone={false}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3
              className={`text-sm font-medium ${
                saldoGeral >= 0 ? "text-blue-800" : "text-orange-800"
              }`}
            >
              Resultado Financeiro Consolidado
            </h3>
            <p
              className={`text-3xl font-semibold ${
                saldoGeral >= 0 ? "text-blue-600" : "text-orange-600"
              }`}
            >
              {formatarMoeda(saldoGeral)}
            </p>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <FinancialValueDisplay
              label="Entradas"
              value={saldoOperacoes}
              color="green"
              compact
            />
            <FinancialValueDisplay
              label="Saídas"
              value={saldoCustos}
              color="red"
              compact
            />
          </div>
        </div>
      </TooltipGenerico>
    </div>
  );
};
