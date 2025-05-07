import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarPedido, atualizarPedido } from "../../api/pedidos";
import { Pedido } from "../Home/types/pedidos";
import PedidoForm from "../../components/PedidoForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";

const PedidoEdit = () => {
  const { id } = useParams<{ id: string }>(); // Tipagem mais específica
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controle de submit

  useEffect(() => {
    const carregarPedido = async () => {
      try {
        if (!id) {
          throw new Error("ID do pedido não fornecido");
        }

        setLoading(true);
        setError("");

        const response = await buscarPedido(id);
        setPedido(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro ao carregar pedido. Tente novamente mais tarde.";
        setError(errorMessage);
        console.error("Erro ao carregar pedido:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarPedido();
  }, [id]);

  const handleSubmit = async (dadosAtualizados: Omit<Pedido, "_id">) => {
    try {
      if (!id) {
        throw new Error("ID do pedido não fornecido");
      }

      setIsSubmitting(true);
      setError("");

      await atualizarPedido(id, dadosAtualizados);

      navigate(`/pedidos/${id}`, {
        state: {
          success: true,
          message: "Pedido atualizado com sucesso!",
        },
        replace: true, // Evita voltar para a página de edição com o botão "voltar"
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao atualizar pedido. Verifique os dados e tente novamente.";
      setError(errorMessage);
      console.error("Erro ao atualizar pedido:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="mt-4">
          <button
            onClick={() => navigate("/pedidos")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar para lista
          </button>
        </div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          type="info"
          message="Pedido não encontrado"
          actions={
            <button
              onClick={() => navigate("/pedidos")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Voltar para lista
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PedidoForm
        initialData={pedido}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/pedidos/${id}`)}
        isEditing={true}
        isSubmitting={isSubmitting} // Passa o estado de submissão para o formulário
      />
    </div>
  );
};

export default PedidoEdit;
