import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { formatarMoeda } from "../utils/currency";

interface ConsolidatedResultTooltipProps {
  totalVendas: number;
  totalInvestimentos: number;
  totalCompras: number;
  totalDespesas: number;
  saldoOperacoes: number;
  saldoCustos: number;
  saldoGeral: number;
}

export const ConsolidatedResultTooltip = ({
  totalVendas,
  totalInvestimentos,
  totalCompras,
  totalDespesas,
  saldoOperacoes,
  saldoCustos,
  saldoGeral,
}: ConsolidatedResultTooltipProps) => (
  <div className="space-y-3">
    <div className="p-2 bg-green-50 rounded">
      <h4 className="font-medium text-green-800 flex items-center">
        <ArrowUpIcon className="h-4 w-4 mr-1" />
        Entradas Totais
      </h4>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div>
          <p className="text-sm text-gray-600">Vendas:</p>
          <p className="font-medium">{formatarMoeda(totalVendas)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Investimentos:</p>
          <p className="font-medium">{formatarMoeda(totalInvestimentos)}</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-green-100">
        <p className="text-sm text-gray-600">Total Entradas:</p>
        <p className="font-semibold text-green-700">
          {formatarMoeda(saldoOperacoes)}
        </p>
      </div>
    </div>

    <div className="p-2 bg-red-50 rounded">
      <h4 className="font-medium text-red-800 flex items-center">
        <ArrowDownIcon className="h-4 w-4 mr-1" />
        Saídas Totais
      </h4>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div>
          <p className="text-sm text-gray-600">Compras:</p>
          <p className="font-medium">{formatarMoeda(totalCompras)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Despesas:</p>
          <p className="font-medium">{formatarMoeda(totalDespesas)}</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-red-100">
        <p className="text-sm text-gray-600">Total Saídas:</p>
        <p className="font-semibold text-red-700">
          {formatarMoeda(saldoCustos)}
        </p>
      </div>
    </div>

    <div className="p-2 bg-blue-50 rounded">
      <h4 className="font-medium text-blue-800">Cálculo do Resultado</h4>
      <p className="text-sm mt-1">
        <span className="font-medium">Entradas - Saídas =</span>
        <span
          className={`ml-2 font-bold ${
            saldoGeral >= 0 ? "text-blue-600" : "text-orange-600"
          }`}
        >
          {formatarMoeda(saldoGeral)}
        </span>
      </p>
      <p className="text-xs text-gray-500 mt-1">
        ({formatarMoeda(saldoOperacoes)}) - ({formatarMoeda(saldoCustos)})
      </p>
    </div>
  </div>
);
