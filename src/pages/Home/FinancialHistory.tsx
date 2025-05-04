import { useState, useEffect } from "react";
import { listarPedidos } from "../../api/pedidos";
import {
  FinancialSummary,
  MonthlyFinancialData,
  FinancialTransaction,
  MonthlyGroup,
  Pedido,
} from "./types";
import MonthlyFinancialChart from "./MonthlyFinancialChart";

const FinancialHistory = () => {
  const [financialData, setFinancialData] = useState<FinancialSummary | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        const responseVendas = await listarPedidos("VENDA");
        const responseCompras = await listarPedidos("COMPRA");

        const vendas: Pedido[] = responseVendas.data;
        const compras: Pedido[] = responseCompras.data;

        const processedData = processFinancialData(vendas, compras);
        setFinancialData(processedData);
      } catch (err) {
        setError("Falha ao carregar dados financeiros");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFinancialData();
  }, []);

  const processFinancialData = (
    vendas: Pedido[],
    compras: Pedido[]
  ): FinancialSummary => {
    const allTransactions: FinancialTransaction[] = [...vendas, ...compras].map(
      (pedido) => ({
        id: pedido._id,
        date: new Date(pedido.dataPedido),
        type: pedido.tipo,
        amount: pedido.totalPedido,
        month: new Date(pedido.dataPedido).getMonth() + 1,
        year: new Date(pedido.dataPedido).getFullYear(),
      })
    );

    const monthlyGroups: MonthlyGroup = allTransactions.reduce(
      (acc: MonthlyGroup, transaction) => {
        const key = `${transaction.year}-${transaction.month}`;
        if (!acc[key]) {
          acc[key] = {
            month: transaction.month,
            year: transaction.year,
            totalSales: 0,
            totalPurchases: 0,
            transactions: [],
          };
        }

        if (transaction.type === "VENDA") {
          acc[key].totalSales += transaction.amount;
        } else {
          acc[key].totalPurchases += transaction.amount;
        }

        acc[key].transactions.push(transaction);
        return acc;
      },
      {}
    );

    const monthlyData: MonthlyFinancialData[] = Object.values(monthlyGroups)
      .map((month) => ({
        ...month,
        profit: month.totalSales - month.totalPurchases,
      }))
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });

    const totalSales = monthlyData.reduce(
      (sum, month) => sum + month.totalSales,
      0
    );
    const totalPurchases = monthlyData.reduce(
      (sum, month) => sum + month.totalPurchases,
      0
    );
    const totalProfit = totalSales - totalPurchases;

    return {
      currentBalance: totalProfit,
      monthlyData,
      totalSales,
      totalPurchases,
      totalProfit,
    };
  };

  if (loading) {
    return <div className="text-center py-8">Carregando dados...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!financialData || financialData.monthlyData.length === 0) {
    return (
      <div className="text-center py-8">Nenhum dado financeiro disponível</div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
      <h2 className="text-gray-800 text-xl md:text-2xl mb-6 pb-3 border-b border-gray-100">
        Gerenciamento Financeiro
      </h2>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Vendas</p>
          <p className="text-2xl font-bold text-blue-700">
            {financialData.totalSales.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Compras</p>
          <p className="text-2xl font-bold text-red-700">
            {financialData.totalPurchases.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg ${
            financialData.totalProfit >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <p className="text-sm text-gray-600">Lucro Total</p>
          <p
            className={`text-2xl font-bold ${
              financialData.totalProfit >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {financialData.totalProfit.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      {/* Gráfico Unificado */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Histórico Anual -{" "}
          {financialData.monthlyData[0]?.year || new Date().getFullYear()}
        </h3>
        <MonthlyFinancialChart
          monthlyData={financialData.monthlyData}
          year={financialData.monthlyData[0]?.year || new Date().getFullYear()}
        />
      </div>
    </div>
  );
};

export default FinancialHistory;
