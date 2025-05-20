// components/PedidoSummary.tsx
import { formatarMoeda } from "./pedidoUtils";
import { Pedido } from "./types";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

interface PedidoSummaryProps {
  pedidos: Pedido[];
  filtroTipo: "TODOS" | "VENDA" | "COMPRA";
}

export const PedidoSummary = ({ pedidos, filtroTipo }: PedidoSummaryProps) => {
  // Calcula totais baseados no tipo
  const { total, totalAPagar, totalAReceber } = pedidos.reduce(
    (acc, pedido) => {
      const valorPedido = pedido.totalPedido;
      const parcelas = pedido.parcelas || [];
      const isPago = pedido.status === "PAGO";

      if (pedido.tipo === "COMPRA") {
        acc.total -= valorPedido;

        if (!isPago) {
          const totalPago = parcelas
            .filter((p) => p.pago)
            .reduce((sum, p) => sum + p.valor, 0);
          const pendente = valorPedido - totalPago;
          if (pendente > 0) acc.totalAPagar += pendente;
        }
      } else {
        // VENDA
        acc.total += valorPedido;

        if (!isPago) {
          const totalRecebido = parcelas
            .filter((p) => p.pago)
            .reduce((sum, p) => sum + p.valor, 0);
          const pendente = valorPedido - totalRecebido;
          if (pendente > 0) acc.totalAReceber += pendente;
        }
      }

      return acc;
    },
    { total: 0, totalAPagar: 0, totalAReceber: 0 }
  );

  // Formata valores grandes de forma compacta
  const formatarValorCompacto = (valor: number) => {
    if (valor >= 1000000) return `${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `${(valor / 1000).toFixed(1)}K`;
    return formatarMoeda(valor);
  };

  // Determina quais resumos mostrar
  const mostrar = {
    venda:
      (filtroTipo === "TODOS" || filtroTipo === "VENDA") && totalAReceber > 0,
    compra:
      (filtroTipo === "TODOS" || filtroTipo === "COMPRA") && totalAPagar > 0,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-3">Resumo Financeiro</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Geral */}
        <div className="border-r border-gray-200 pr-4 group relative">
          <p className="text-sm text-gray-500">Total Geral</p>
          <div className="flex items-center">
            <p
              className={`text-xl font-semibold transition-all duration-300 ${
                total < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {formatarValorCompacto(Math.abs(total))}
            </p>
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
          <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10 mt-1">
            Valor exato: {formatarMoeda(Math.abs(total))}
          </div>
        </div>

        {/* Resumo Vendas */}
        {mostrar.venda && (
          <div className="border-r border-gray-200 pr-4 group relative">
            <p className="text-sm text-gray-500">A Receber (Vendas)</p>
            <div className="flex items-center">
              <p className="text-xl font-semibold text-red-600 transition-all duration-300">
                {formatarValorCompacto(totalAReceber)}
              </p>
              <ArrowUpIcon className="h-5 w-5 text-red-600 ml-2" />
            </div>
            <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10 mt-1">
              <p>Valor exato: {formatarMoeda(totalAReceber)}</p>
              <p>Total de vendas com parcelas pendentes</p>
            </div>
          </div>
        )}

        {/* Resumo Compras */}
        {mostrar.compra && (
          <div className="group relative">
            <p className="text-sm text-gray-500">A Pagar (Compras)</p>
            <div className="flex items-center">
              <p className="text-xl font-semibold text-red-600 transition-all duration-300">
                {formatarValorCompacto(totalAPagar)}
              </p>
              <ArrowDownIcon className="h-5 w-5 text-red-600 ml-2" />
            </div>
            <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10 mt-1">
              <p>Valor exato: {formatarMoeda(totalAPagar)}</p>
              <p>Total de compras com parcelas pendentes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
