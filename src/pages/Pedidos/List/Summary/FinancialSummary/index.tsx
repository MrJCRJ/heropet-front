import { useFinancaList } from "../../../../Financas/List/useFinancaList";
import { useFinancialCalculations } from "../../../../../hooks/useFinancialCalculations";
import { ConsolidatedResult } from "../../../../../components/ConsolidatedResult";
import { OrderBalance } from "../../../../../components/OrderBalance";
import { PendingReceivables } from "../../../../../components/PendingReceivables";
import { PendingPayables } from "../../../../../components/PendingPayables";
import { FinancialSummaryProps } from "../../../../../types/pedidos";

export const FinancialSummary = ({
  pedidos,
  filtroTipo,
}: FinancialSummaryProps) => {
  const { financas } = useFinancaList();
  const {
    total,
    totalAPagar,
    totalAReceber,
    saldoGeral,
    saldoOperacoes,
    saldoCustos,
    totalVendas,
    totalCompras,
    totalInvestimentos,
    totalDespesas,
  } = useFinancialCalculations(pedidos, financas);

  const mostrar = {
    venda:
      (filtroTipo === "TODOS" || filtroTipo === "VENDA") && totalAReceber > 0,
    compra:
      (filtroTipo === "TODOS" || filtroTipo === "COMPRA") && totalAPagar > 0,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-3">
        Resumo Financeiro Consolidado
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ConsolidatedResult
          saldoGeral={saldoGeral}
          saldoOperacoes={saldoOperacoes}
          saldoCustos={saldoCustos}
          totalVendas={totalVendas}
          totalInvestimentos={totalInvestimentos}
          totalCompras={totalCompras}
          totalDespesas={totalDespesas}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OrderBalance
          total={total}
          totalVendas={totalVendas}
          totalCompras={totalCompras}
        />
        {mostrar.venda && <PendingReceivables totalAReceber={totalAReceber} />}
        {mostrar.compra && <PendingPayables totalAPagar={totalAPagar} />}
      </div>
    </div>
  );
};
