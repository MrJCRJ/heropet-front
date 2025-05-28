// pages/Pedidos/List/index.tsx
import { usePedidoList } from "./usePedidoList";
import { PedidoHeader } from "./ListHeader";
import { PedidoTable } from "./ListTable";
import { EstoqueSummary } from "./Summary/EstoqueSummary";
import { PedidoSummary } from "./Summary/PedidoSummary";

import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { Alert } from "../../../components/ui/Alert";
import { ParceirosSummary } from "../../../components/Summary/Parceiros";

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
        <PedidoSummary pedidos={pedidos} filtroTipo={filtroTipo} />
        <EstoqueSummary pedidos={pedidos} />
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
