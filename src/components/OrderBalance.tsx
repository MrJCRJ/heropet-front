import { TooltipGenerico } from "./TooltipGenerico";
import { FinancialValueDisplay } from "./FinancialValueDisplay";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { BalanceSummaryProps } from "../types/pedidos";
import { formatarMoeda } from "../utils/currency";

export const OrderBalance = ({
  total,
  totalVendas,
  totalCompras,
}: BalanceSummaryProps) => (
  <div className="border-r border-gray-200 pr-4">
    <p className="text-sm text-gray-500">Saldo de Pedidos</p>
    <TooltipGenerico
      conteudo={
        <>
          <p>Resultado das operações comerciais</p>
          <div className="mt-2 grid grid-cols-[auto,1fr] gap-x-2">
            <span className="font-medium">Vendas:</span>
            <span>{formatarMoeda(totalVendas)}</span>
            <span className="font-medium">Compras:</span>
            <span>{formatarMoeda(totalCompras)}</span>
            <span className="font-medium border-t border-gray-300 pt-1">
              Total:
            </span>
            <span className="border-t border-gray-300 pt-1">
              {formatarMoeda(total)}
            </span>
          </div>
        </>
      }
      icone={false}
    >
      <div className="flex items-center">
        <FinancialValueDisplay
          label="Saldo de Pedidos"
          value={Math.abs(total)}
          color={total < 0 ? "red" : "green"}
          compact
        />
        {total !== 0 && (
          <span className="ml-2">
            {total < 0 ? (
              <ArrowDownIcon className="h-5 w-5 text-red-600" />
            ) : (
              <ArrowUpIcon className="h-5 w-5 text-green-600" />
            )}
          </span>
        )}
      </div>
    </TooltipGenerico>
  </div>
);
