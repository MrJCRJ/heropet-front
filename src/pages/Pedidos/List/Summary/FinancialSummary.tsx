// components/FinancialSummary.tsx
import { formatarMoeda } from "../../pedidoUtils";
import { Pedido } from "../../types";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { TooltipGenerico } from "../../../../components/TooltipGenerico";
import { useFinancaList } from "../../../Financas/List/useFinancaList";

interface FinancialSummaryProps {
  pedidos: Pedido[];
  filtroTipo: "TODOS" | "VENDA" | "COMPRA";
}

export const FinancialSummary = ({
  pedidos,
  filtroTipo,
}: FinancialSummaryProps) => {
  // Calculations from PedidoSummary
  const { total, totalAPagar, totalAReceber, totalVendas, totalCompras } =
    pedidos.reduce(
      (acc, pedido) => {
        const valorPedido = pedido.totalPedido;
        const parcelas = pedido.parcelas || [];
        const isPago = pedido.status === "PAGO";

        if (pedido.tipo === "COMPRA") {
          acc.total -= valorPedido;
          acc.totalCompras += valorPedido;

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
          acc.totalVendas += valorPedido;

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
      {
        total: 0,
        totalAPagar: 0,
        totalAReceber: 0,
        totalVendas: 0,
        totalCompras: 0,
      }
    );

  // Calculations from FinancaSummary
  const { financas } = useFinancaList();
  const totalInvestimentos = financas
    .filter((f) => f.tipo === "Investimento")
    .reduce((sum, f) => sum + f.valor, 0);
  const totalDespesas = financas
    .filter((f) => f.tipo === "Despesa")
    .reduce((sum, f) => sum + f.valor, 0);
  const saldoFinancas = totalInvestimentos - totalDespesas;

  // Formatting function
  const formatarValorCompacto = (valor: number) => {
    if (valor >= 1000000) return `${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `${(valor / 1000).toFixed(1)}K`;
    return formatarMoeda(valor);
  };

  // Determine which summaries to show
  const mostrar = {
    venda:
      (filtroTipo === "TODOS" || filtroTipo === "VENDA") && totalAReceber > 0,
    compra:
      (filtroTipo === "TODOS" || filtroTipo === "COMPRA") && totalAPagar > 0,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-3">Resumo Financeiro Completo</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Finances Summary */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Investimentos</h3>
          <p className="text-2xl font-semibold text-green-600">
            {formatarMoeda(totalInvestimentos)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Despesas</h3>
          <p className="text-2xl font-semibold text-red-600">
            {formatarMoeda(totalDespesas)}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg ${
            saldoFinancas >= 0 ? "bg-blue-50" : "bg-orange-50"
          }`}
        >
          <h3
            className={`text-sm font-medium ${
              saldoFinancas >= 0 ? "text-blue-800" : "text-orange-800"
            }`}
          >
            Saldo Finanças
          </h3>
          <p
            className={`text-2xl font-semibold ${
              saldoFinancas >= 0 ? "text-blue-600" : "text-orange-600"
            }`}
          >
            {formatarMoeda(saldoFinancas)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Orders Summary */}
        <div className="border-r border-gray-200 pr-4">
          <p className="text-sm text-gray-500">Total Geral Pedidos</p>
          <TooltipGenerico
            conteudo={
              <>
                <p>Valor exato: {formatarMoeda(Math.abs(total))}</p>
                <div className="border-t border-gray-600 my-1 pt-1">
                  <p>Total Vendas: {formatarMoeda(totalVendas)}</p>
                  <p>Total Compras: {formatarMoeda(totalCompras)}</p>
                </div>
                <p className="mt-1">
                  Cálculo: Vendas ({formatarMoeda(totalVendas)}) - Compras (
                  {formatarMoeda(totalCompras)}) = {formatarMoeda(total)}
                </p>
              </>
            }
            icone={false}
          >
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
          </TooltipGenerico>
        </div>

        {/* Resumo Vendas */}
        {mostrar.venda && (
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
                <p className="text-xl font-semibold text-red-600 transition-all duration-300">
                  {formatarValorCompacto(totalAReceber)}
                </p>
                <ArrowUpIcon className="h-5 w-5 text-red-600 ml-2" />
              </div>
            </TooltipGenerico>
          </div>
        )}

        {/* Resumo Compras */}
        {mostrar.compra && (
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
                <p className="text-xl font-semibold text-red-600 transition-all duration-300">
                  {formatarValorCompacto(totalAPagar)}
                </p>
                <ArrowDownIcon className="h-5 w-5 text-red-600 ml-2" />
              </div>
            </TooltipGenerico>
          </div>
        )}
      </div>
    </div>
  );
};
