import { useMemo } from "react";
import { Pedido, FinancialCalculationsResult } from "../pages/Pedidos/types";
import { FinancaData } from "../types/financas";

export const useFinancialCalculations = (
  pedidos: Pedido[],
  financas: FinancaData[]
): FinancialCalculationsResult => {
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

  const { totalInvestimentos, totalDespesas } = useMemo(() => {
    const investimentos = financas
      .filter((f) => f.tipo === "Investimento")
      .reduce((sum, f) => sum + f.valor, 0);
    const despesas = financas
      .filter((f) => f.tipo === "Despesa")
      .reduce((sum, f) => sum + f.valor, 0);
    return { totalInvestimentos: investimentos, totalDespesas: despesas };
  }, [financas]);

  const saldoOperacoes = totalVendas + totalInvestimentos;
  const saldoCustos = totalCompras + totalDespesas;
  const saldoGeral = saldoOperacoes - saldoCustos;

  return {
    total,
    totalAPagar,
    totalAReceber,
    totalVendas,
    totalCompras,
    totalInvestimentos,
    totalDespesas,
    saldoOperacoes,
    saldoCustos,
    saldoGeral,
  };
};
