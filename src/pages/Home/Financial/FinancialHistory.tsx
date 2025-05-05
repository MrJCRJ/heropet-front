import { useState, useEffect } from "react";
import { listarPedidos } from "../../../api/pedidos";
import {
  FinancialSummary,
  MonthlyFinancialData,
  FinancialTransaction,
  MonthlyFinancialGroup,
} from "../types/types";
import MonthlyFinancialChart from "./MonthlyFinancialChart";
import { Pedido } from "../types/pedidos";

// Componente para os cards de resumo
const SummaryCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "blue" | "red" | "green";
}) => {
  const colorClasses = {
    blue: { bg: "bg-blue-50", text: "text-blue-700" },
    red: { bg: "bg-red-50", text: "text-red-700" },
    green: { bg: "bg-green-50", text: "text-green-700" },
  };

  return (
    <div className={`p-4 rounded-lg ${colorClasses[color].bg}`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`text-2xl font-bold ${colorClasses[color].text}`}>
        {value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
};

// Hook para gerenciamento dos dados financeiros
const useFinancialData = () => {
  const [data, setData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processFinancialData = (
    vendas: Pedido[] | undefined, // Adicione undefined como tipo possível
    compras: Pedido[] | undefined // Adicione undefined como tipo possível
  ): FinancialSummary => {
    // Verifique se os dados são válidos antes de processar
    const vendasArray = vendas || [];
    const comprasArray = compras || [];

    const allTransactions: FinancialTransaction[] = [
      ...vendasArray,
      ...comprasArray,
    ].map((pedido) => ({
      id: pedido._id,
      date: new Date(pedido.dataPedido),
      type: pedido.tipo,
      amount: pedido.totalPedido,
      month: new Date(pedido.dataPedido).getMonth() + 1,
      year: new Date(pedido.dataPedido).getFullYear(),
    }));

    const monthlyGroups = allTransactions.reduce<MonthlyFinancialGroup>(
      (acc, transaction) => {
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
      .map((monthData) => ({
        ...monthData,
        profit: monthData.totalSales - monthData.totalPurchases,
      }))
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });

    const totals = monthlyData.reduce(
      (acc, month) => {
        acc.totalSales += month.totalSales;
        acc.totalPurchases += month.totalPurchases;
        return acc;
      },
      { totalSales: 0, totalPurchases: 0 }
    );

    return {
      currentBalance: totals.totalSales - totals.totalPurchases,
      monthlyData,
      totalSales: totals.totalSales,
      totalPurchases: totals.totalPurchases,
      totalProfit: totals.totalSales - totals.totalPurchases,
    };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // No seu useEffect dentro de useFinancialData
        const [responseVendas, responseCompras] = await Promise.all([
          listarPedidos({ tipo: "VENDA" }),
          listarPedidos({ tipo: "COMPRA" }),
        ]);

        // Modifique para:
        setData(processFinancialData(responseVendas, responseCompras));
      } catch (err) {
        console.error("Erro detalhado:", err);
        setError("Falha ao carregar dados financeiros");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

const FinancialHistory = () => {
  const { data: financialData, loading, error } = useFinancialData();

  if (loading)
    return <div className="text-center py-8">Carregando dados...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Total Vendas"
          value={financialData.totalSales}
          color="blue"
        />
        <SummaryCard
          title="Total Compras"
          value={financialData.totalPurchases}
          color="red"
        />
        <SummaryCard
          title="Lucro Total"
          value={financialData.totalProfit}
          color={financialData.totalProfit >= 0 ? "green" : "red"}
        />
      </div>

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
