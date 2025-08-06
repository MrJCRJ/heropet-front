import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { usePedido } from "../../hooks/usePedido";
import { usePedidoActions } from "../../hooks/usePedidoActions";
import { PedidoViewContent } from "../../components/PedidoViewContent";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Importe o ícone de voltar

export const PedidoView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    pedido,
    loading,
    error,
    handleTogglePago,
    handleRemoveTodasParcelas,
  } = usePedido(id);

  const {
    showDeleteModal,
    isDeleting,
    isEditing,
    setIsEditing,
    setShowDeleteModal,
    handleDelete,
  } = usePedidoActions({ id, navigate });

  const handleVoltar = () => {
    navigate(-1); // Volta para a página anterior
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!pedido) return <div className="p-4">Pedido não encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Adicionando o botão Voltar */}
      <button
        onClick={handleVoltar}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Voltar
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Detalhes do Pedido
      </h1>

      <PedidoViewContent
        pedido={pedido}
        isEditing={isEditing}
        onTogglePago={handleTogglePago}
        onRemoveTodasParcelas={handleRemoveTodasParcelas}
      />

      <div className="mt-6 flex justify-between">
        {" "}
        {/* Alterado para justify-between */}
        <button
          onClick={handleVoltar}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Voltar
        </button>
        <div className="space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Cancelar Edição" : "Editar"}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Confirmar Exclusão</h2>
            <p className="mb-6">Tem certeza que deseja excluir este pedido?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={isDeleting}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidoView;
