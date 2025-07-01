import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { criarPedido } from "../../api/pedidos";
import { Pedido } from "../../types/pedidos";
import PedidoForm from "../../components/PedidoForm";
import { Alert } from "../../components/ui/Alert";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal from "../../components/ui/Modal";

const PedidoCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSubmit = async (pedidoData: Omit<Pedido, "_id">) => {
    try {
      setIsSubmitting(true);
      setError("");

      if (pedidoData.itens.length === 0) {
        throw new Error("Adicione pelo menos um item ao pedido");
      }

      // Verifica se tem parcelas e se estão válidas
      if (pedidoData.parcelas && pedidoData.parcelas.length > 0) {
        const parcelasInvalidas = pedidoData.parcelas.some(
          (p) => !p.dataVencimento || p.valor <= 0
        );
        if (parcelasInvalidas) {
          throw new Error("Parcelas inválidas. Verifique datas e valores");
        }
      }

      const response = await criarPedido(pedidoData);

      navigate("/pedidos", {
        state: {
          success: true,
          message: `Pedido #${response.data._id} criado com sucesso!`,
        },
        replace: true,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao criar pedido. Verifique os dados e tente novamente.";
      setError(errorMessage);
      console.error("Erro ao criar pedido:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    navigate("/pedidos");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-white">Salvando pedido...</span>
        </div>
      )}

      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} onClose={() => setError("")} />
        </div>
      )}

      <PedidoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        isEditing={false} // Definindo explicitamente como false
      />

      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Confirmar Cancelamento"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja cancelar a criação deste pedido?
          </p>
          <p className="text-gray-600 text-sm">
            Todas as informações não salvas serão perdidas.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowCancelModal(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
            >
              Continuar Editando
            </button>
            <button
              onClick={confirmCancel}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-colors"
            >
              Confirmar Cancelamento
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PedidoCreate;
