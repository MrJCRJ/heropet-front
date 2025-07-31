import { Link } from "react-router-dom";

type PedidoActionsProps = {
  id?: string;
  isEditing: boolean;
  isDeleting: boolean;
  setIsEditing: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
};

export const PedidoActions = ({
  id,
  isEditing,
  isDeleting,
  setIsEditing,
  setShowDeleteModal,
}: PedidoActionsProps) => (
  <div className="p-6 bg-gray-50 flex flex-wrap gap-3 justify-end">
    <button
      onClick={() => setIsEditing(!isEditing)}
      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
    >
      {isEditing ? "Cancelar Edição" : "Editar Parcelas"}
    </button>
    <Link
      to={`/pedidos/${id}/editar`}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
    >
      Editar Pedido
    </Link>
    <button
      onClick={() => setShowDeleteModal(true)}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-colors"
      disabled={isDeleting}
    >
      Excluir Pedido
    </button>
  </div>
);
