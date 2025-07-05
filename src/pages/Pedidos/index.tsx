import { usePedidoList } from "../../hooks/usePedidoList";
import { PedidoHeader } from "./List/ListHeader";
import { PedidoTable } from "./List/ListTable";
import { EstoqueSummary } from "./List/Summary/EstoqueSummary";
import { FinancialSummary } from "./List/Summary/FinancialSummary";
import { ParceirosSummary } from "./List/Summary/Parceiros";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";

const PedidoList = () => {
  const {
    pedidos = [],
    loading,
    error,
    filtroTipo,
    filtroStatus,
    ordenacao,
    selectedMonth,
    selectedYear,
    handleFilterChange,
    toggleOrdenacao,
  } = usePedidoList();

  if (loading && pedidos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PedidoHeader />
      <div className="mt-6">
        {/* Contêiner flex para os resumos lado a lado */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <FinancialSummary pedidos={pedidos} filtroTipo={filtroTipo} />
          </div>
          <div className="flex-1">
            <EstoqueSummary pedidos={pedidos} />
          </div>
        </div>

        <ParceirosSummary pedidos={pedidos} />
        <PedidoTable
          pedidos={pedidos}
          ordenacao={ordenacao}
          filtroTipo={filtroTipo}
          filtroStatus={filtroStatus}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onOrdenarClick={toggleOrdenacao}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default PedidoList;
