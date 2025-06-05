// components/FinancialSummary.tsx
import { formatarMoeda } from "../../pedidoUtils";
import { Pedido, FiltroPedido } from "../../types";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { TooltipGenerico } from "../../../../components/TooltipGenerico";
import { useFinancaList } from "../../../Financas/List/useFinancaList";
import { useMemo } from "react";

interface FinancialSummaryProps {
  pedidos: Pedido[];
  filtroTipo: FiltroPedido;
}

export const FinancialSummary = ({
  pedidos,
  filtroTipo,
}: FinancialSummaryProps) => {
  // Calculate order-related financial data
  const { total, totalAPagar, totalAReceber, totalVendas, totalCompras } =
    useMemo(() => {
      return pedidos.reduce(
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
    }, [pedidos]);

  // Calculate general finance data
  const { financas } = useFinancaList();
  const { totalInvestimentos, totalDespesas } = useMemo(() => {
    const investimentos = financas
      .filter((f) => f.tipo === "Investimento")
      .reduce((sum, f) => sum + f.valor, 0);
    const despesas = financas
      .filter((f) => f.tipo === "Despesa")
      .reduce((sum, f) => sum + f.valor, 0);
    return {
      totalInvestimentos: investimentos,
      totalDespesas: despesas,
    };
  }, [financas]);

  // Novos cálculos reorganizados
  const saldoOperacoes = totalVendas + totalInvestimentos;
  const saldoCustos = totalCompras + totalDespesas;
  const saldoGeral = saldoOperacoes - saldoCustos;

  const formatarValorCompacto = (valor: number) => {
    if (valor >= 1_000_000) return `${(valor / 1_000_000).toFixed(1)}M`;
    if (valor >= 1_000) return `${(valor / 1_000).toFixed(1)}K`;
    return formatarMoeda(valor);
  };

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

      {/* Seção de Saldos Consolidados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Entradas (Vendas + Investimentos) */}
        <div className="bg-green-50 p-4 rounded-lg">
          <TooltipGenerico
            conteudo={
              <div>
                <p>Valor total de entradas</p>
                <div className="mt-2 grid grid-cols-[auto,1fr] gap-x-2 gap-y-1">
                  <span className="font-medium">Vendas:</span>
                  <span>{formatarMoeda(totalVendas)}</span>
                  <span className="font-medium">Investimentos:</span>
                  <span>{formatarMoeda(totalInvestimentos)}</span>
                  <span className="font-medium border-t border-gray-300 pt-1">
                    Total:
                  </span>
                  <span className="border-t border-gray-300 pt-1 font-semibold">
                    {formatarMoeda(saldoOperacoes)}
                  </span>
                </div>
              </div>
            }
            icone={false}
          >
            <div className="flex items-center">
              <ArrowUpIcon className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Entradas</h3>
                <p className="text-xl font-semibold text-green-600">
                  {formatarMoeda(saldoOperacoes)}
                </p>
              </div>
            </div>
          </TooltipGenerico>
        </div>

        {/* Saídas (Compras + Despesas) */}
        <div className="bg-red-50 p-4 rounded-lg">
          <TooltipGenerico
            conteudo={
              <div>
                <p>Valor total de saídas</p>
                <div className="mt-2 grid grid-cols-[auto,1fr] gap-x-2 gap-y-1">
                  <span className="font-medium">Compras:</span>
                  <span>{formatarMoeda(totalCompras)}</span>
                  <span className="font-medium">Despesas:</span>
                  <span>{formatarMoeda(totalDespesas)}</span>
                  <span className="font-medium border-t border-gray-300 pt-1">
                    Total:
                  </span>
                  <span className="border-t border-gray-300 pt-1 font-semibold">
                    {formatarMoeda(saldoCustos)}
                  </span>
                </div>
              </div>
            }
            icone={false}
          >
            <div className="flex items-center">
              <ArrowDownIcon className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Saídas</h3>
                <p className="text-xl font-semibold text-red-600">
                  {formatarMoeda(saldoCustos)}
                </p>
              </div>
            </div>
          </TooltipGenerico>
        </div>

        {/* Resultado Consolidado */}
        <div
          className={`p-4 rounded-lg ${
            saldoGeral >= 0 ? "bg-blue-50" : "bg-orange-50"
          }`}
        >
          <TooltipGenerico
            conteudo={
              <div>
                <p>Resultado financeiro consolidado</p>
                <p className="mt-2">
                  (Vendas + Investimentos) - (Compras + Despesas)
                </p>
                <p className="mt-2 font-medium">
                  ({formatarMoeda(totalVendas)} +{" "}
                  {formatarMoeda(totalInvestimentos)}) - (
                  {formatarMoeda(totalCompras)} + {formatarMoeda(totalDespesas)}
                  ) ={" "}
                  <span
                    className={`ml-1 ${
                      saldoGeral >= 0 ? "text-blue-600" : "text-orange-600"
                    }`}
                  >
                    {formatarMoeda(saldoGeral)}
                  </span>
                </p>
              </div>
            }
            icone={false}
          >
            <div>
              <h3
                className={`text-sm font-medium ${
                  saldoGeral >= 0 ? "text-blue-800" : "text-orange-800"
                }`}
              >
                Resultado Consolidado
              </h3>
              <p
                className={`text-2xl font-semibold ${
                  saldoGeral >= 0 ? "text-blue-600" : "text-orange-600"
                }`}
              >
                {formatarMoeda(saldoGeral)}
              </p>
            </div>
          </TooltipGenerico>
        </div>
      </div>

      {/* Seção de Detalhes Operacionais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Saldo de Pedidos */}
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
              <p
                className={`text-xl font-semibold ${
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

        {/* A Receber (Vendas) */}
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
                <p className="text-xl font-semibold text-green-600 transition-all duration-300">
                  {formatarValorCompacto(totalAReceber)}
                </p>
                <ArrowUpIcon className="h-5 w-5 text-green-600 ml-2" />
              </div>
            </TooltipGenerico>
          </div>
        )}

        {/* A Pagar (Compras) */}
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
