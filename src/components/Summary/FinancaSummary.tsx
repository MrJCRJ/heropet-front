// src/pages/Financas/List/Summary/FinancaSummary.tsx
import { useFinancaList } from "../../pages/Financas/List/useFinancaList";
import { formatarMoeda } from "../../pages/Pedidos/pedidoUtils";

export const FinancaSummary = () => {
  const { financas } = useFinancaList();

  const totalInvestimentos = financas
    .filter((f) => f.tipo === "Investimento")
    .reduce((sum, f) => sum + f.valor, 0);

  const totalDespesas = financas
    .filter((f) => f.tipo === "Despesa")
    .reduce((sum, f) => sum + f.valor, 0);

  const saldo = totalInvestimentos - totalDespesas;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
          saldo >= 0 ? "bg-blue-50" : "bg-orange-50"
        }`}
      >
        <h3
          className={`text-sm font-medium ${
            saldo >= 0 ? "text-blue-800" : "text-orange-800"
          }`}
        >
          Saldo
        </h3>
        <p
          className={`text-2xl font-semibold ${
            saldo >= 0 ? "text-blue-600" : "text-orange-600"
          }`}
        >
          {formatarMoeda(saldo)}
        </p>
      </div>
    </div>
  );
};
