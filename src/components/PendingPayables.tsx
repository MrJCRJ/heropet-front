import { TooltipGenerico } from "./TooltipGenerico";
import { FinancialValueDisplay } from "./FinancialValueDisplay";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { PendingPayablesProps } from "../pages/Pedidos/List/Summary/FinancialSummary/types";
import { formatarMoeda } from "../utils/currency";

export const PendingPayables = ({ totalAPagar }: PendingPayablesProps) => (
  <div>
    <p className="text-sm text-gray-500">A Pagar (Compras)</p>
    <TooltipGenerico
      conteudo={
        <>
          <p>Valor exato: {formatarMoeda(totalAPagar)}</p>
          <p>Total de compras com parcelas pendentes</p>
        </>
      }
      icone={false}
    >
      <div className="flex items-center">
        <FinancialValueDisplay
          label="Valor a Pagar" // Adicionei a label obrigatória
          value={totalAPagar}
          color="red"
          icon={ArrowDownIcon}
          compact
        />
      </div>
    </TooltipGenerico>
  </div>
);
