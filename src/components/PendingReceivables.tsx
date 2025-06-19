// components/PendingReceivables.tsx
import { TooltipGenerico } from "./TooltipGenerico";
import { FinancialValueDisplay } from "./FinancialValueDisplay";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { PendingReceivablesProps } from "../pages/Pedidos/List/Summary/FinancialSummary/types";
import { formatarMoeda } from "../utils/pedidoUtils";

export const PendingReceivables = ({
  totalAReceber,
}: PendingReceivablesProps) => (
  <div className="border-r border-gray-200 pr-4">
    <p className="text-sm text-gray-500">A Receber (Vendas)</p>
    <TooltipGenerico
      conteudo={
        <>
          <p>Valor exato: {formatarMoeda(totalAReceber)}</p>
          <p>Total de vendas com parcelas pendentes</p>
        </>
      }
      icone={false}
    >
      <div className="flex items-center">
        <FinancialValueDisplay
          label="Valor a Receber" // Adicionei a label obrigatória
          value={totalAReceber}
          color="green"
          icon={ArrowUpIcon}
          compact
        />
      </div>
    </TooltipGenerico>
  </div>
);
