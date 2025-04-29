import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { criarPedido, Pedido } from "../../../api/pedidos";
import PedidoForm from "../../../components/PedidoForm";
import Alert from "../../../components/Alert";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PedidoCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (pedidoData: Omit<Pedido, "_id">) => {
    try {
      setIsSubmitting(true);
      setError("");
      await criarPedido(pedidoData);
      navigate("/pedidos", {
        state: {
          success: true,
          message: "Pedido criado com sucesso!",
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar pedido");
      console.error("Erro ao criar pedido:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} />
        </div>
      )}

      <PedidoForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/pedidos")}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PedidoCreate;
