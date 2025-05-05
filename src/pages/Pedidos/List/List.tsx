import { usePedidoList } from "./usePedidoList";
import { PedidoHeader } from "./ListHeader";
import { PedidoFilters } from "./ListFilters";
import { PedidoTable } from "./ListTable";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Alert from "../../../components/Alert";

export const PedidoList = () => {
  const {
    pedidos,
    loading,
    error,
    pedidoParaExcluir,
    setPedidoParaExcluir,
    isDeleting,
    filtroAtivo,
    carregarPedidos,
    handleDeleteClick,
    confirmDelete,
  } = usePedidoList();

  if (loading) {
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
      <PedidoFilters
        filtroAtivo={filtroAtivo}
        onFilterChange={carregarPedidos}
      />
      <PedidoTable
        pedidos={pedidos}
        onDeleteClick={handleDeleteClick}
        isDeleting={isDeleting}
      />

      <Modal
        isOpen={!!pedidoParaExcluir}
        onClose={() => !isDeleting && setPedidoParaExcluir(null)}
        title="Confirmar Exclusão"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja excluir este pedido?
          </p>
          <p className="text-gray-600 text-sm">
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setPedidoParaExcluir(null)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-colors disabled:bg-red-400"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Excluindo...
                </span>
              ) : (
                "Confirmar"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PedidoList;
