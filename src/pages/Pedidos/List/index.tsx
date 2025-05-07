import { usePedidoList } from "./usePedidoList";
import { PedidoHeader } from "./ListHeader";
import { PedidoTable } from "./ListTable";

import LoadingSpinner from "../../../components/LoadingSpinner";
import Alert from "../../../components/Alert";

export const PedidoList = () => {
  const {
    pedidos = [],
    loading,
    error,
    filtroTipo,
    filtroStatus,
    ordenacao,
    handleFilterChange,
    toggleOrdenacao,
  } = usePedidoList();

  if (loading && pedidos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
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
        <PedidoTable
          pedidos={pedidos}
          ordenacao={ordenacao}
          filtroTipo={filtroTipo}
          filtroStatus={filtroStatus}
          onOrdenarClick={toggleOrdenacao}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default PedidoList;
