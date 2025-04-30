import { useState, useEffect } from "react";
import { listarPedidos } from "../../api/pedidos";
import {
  FinancialSummary,
  MonthlyFinancialData,
  FinancialTransaction,
} from "./types";
import FinancialCard from "./FinancialCard";
import PaginationControls from "./PaginationControls";

interface Pedido {
  _id: string;
  tipo: "VENDA" | "COMPRA";
  dataPedido: string;
  totalPedido: number;
  // Adicione outras propriedades conforme necessário
}

const FinancialHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [financialData, setFinancialData] = useState<FinancialSummary | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 2;

  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        const responseVendas = await listarPedidos("VENDA");
        const responseCompras = await listarPedidos("COMPRA");

        // Extrair os dados da resposta Axios
        const vendas: Pedido[] = responseVendas.data;
        const compras: Pedido[] = responseCompras.data;

        // Processar os dados para criar o resumo financeiro
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
    // Agrupar por mês/ano e calcular totais
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

    // Definir tipo para o acumulador
    interface MonthlyGroup {
      [key: string]: {
        month: number;
        year: number;
        totalSales: number;
        totalPurchases: number;
        transactions: FinancialTransaction[];
      };
    }

    // Agrupar por mês/ano
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

    // Calcular lucro por mês e totais gerais
    const monthlyData: MonthlyFinancialData[] = Object.values(monthlyGroups)
      .map((month) => ({
        ...month,
        profit: month.totalSales - month.totalPurchases,
      }))
      .sort((a, b) => {
        // Ordenar por ano e mês
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });

    // Calcular totais
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
      currentBalance: totalProfit, // Simplificação - pode ser ajustado
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

  const totalPages = Math.ceil(financialData.monthlyData.length / itemsPerPage);
  const currentData = financialData.monthlyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

      {/* Dados Mensais */}
      <div className="grid grid-cols-1 gap-6">
        {currentData.map((monthData) => (
          <FinancialCard
            key={`${monthData.year}-${monthData.month}`}
            monthData={monthData}
          />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default FinancialHistory;
