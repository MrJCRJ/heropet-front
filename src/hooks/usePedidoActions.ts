import { useState } from "react";
import { removerPedido } from "../api/pedidos";
import { NavigateFunction } from "react-router-dom";

interface UsePedidoActionsProps {
  id?: string;
  navigate?: NavigateFunction;
}

export const usePedidoActions = ({ id, navigate }: UsePedidoActionsProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!id || !navigate) return;

    setIsDeleting(true);
    try {
      await removerPedido(id);
      navigate("/pedidos", {
        state: { success: true, message: "Pedido excluído com sucesso!" },
      });
    } catch (err) {
      console.error("Erro ao excluir pedido:", err);
      throw err;
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return {
    showDeleteModal,
    isDeleting,
    isEditing,
    setIsEditing,
    setShowDeleteModal,
    handleDelete,
  };
};
