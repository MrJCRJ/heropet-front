import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarPedido,
  removerPedido,
  atualizarPedido,
} from "../../api/pedidos";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";
import { ParcelasView } from "./ParcelasView";
import { ItensPedidoView } from "./ItensPedidoView";
import { Pedido } from "../../types/pedidos";
import { PedidoHeader } from "../../components/PedidoHeader";
import { PedidoInfoSection } from "../../components/PedidoInfoSection";
import { PedidoActions } from "../../components/PedidoActions";
import { DeleteModal } from "../../components/DeleteModal";

export const PedidoView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const carregarPedido = async () => {
      try {
        if (!id) throw new Error("ID do pedido não fornecido");
        setLoading(true);
        setError("");
        const response = await buscarPedido(id);
        setPedido(response.data);
      } catch (err) {
        setError("Erro ao carregar pedido. Tente novamente mais tarde.");
        console.error("Erro ao carregar pedido:", err);
      } finally {
        setLoading(false);
      }
    };
    carregarPedido();
  }, [id]);

  const handleTogglePago = async (numeroParcela: number) => {
    if (!pedido || !pedido.parcelas) return;
    try {
      const parcelasAtualizadas = pedido.parcelas.map((parcela) =>
        parcela.numero === numeroParcela
          ? { ...parcela, pago: !parcela.pago }
          : parcela
      );
      const pedidoAtualizado = { ...pedido, parcelas: parcelasAtualizadas };
      await atualizarPedido(pedido._id!, { parcelas: parcelasAtualizadas });
      setPedido(pedidoAtualizado);
    } catch (err) {
      setError("Erro ao atualizar parcela. Tente novamente.");
      console.error("Erro ao atualizar parcela:", err);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await removerPedido(id);
      navigate("/pedidos", {
        state: { success: true, message: "Pedido excluído com sucesso!" },
      });
    } catch (err) {
      setError("Erro ao excluir pedido. Tente novamente.");
      console.error("Erro ao excluir pedido:", err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleRemoveTodasParcelas = async () => {
    if (!pedido || !pedido.parcelas) return;
    try {
      const pedidoAtualizado = { ...pedido, parcelas: [] };
      await atualizarPedido(pedido._id!, { parcelas: [] });
      setPedido(pedidoAtualizado);
    } catch (err) {
      setError("Erro ao remover parcelas. Tente novamente.");
      console.error("Erro ao remover parcelas:", err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView error={error} />;
  if (!pedido) return <NotFoundView />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PedidoHeader />

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <PedidoInfoSection pedido={pedido} />

        <ItensPedidoView
          itens={pedido.itens}
          totalPedido={pedido.totalPedido}
        />

        {pedido.parcelas && pedido.parcelas.length > 0 && (
          <ParcelasView
            parcelas={pedido.parcelas}
            onTogglePago={handleTogglePago}
            onRemoveTodasParcelas={
              isEditing ? handleRemoveTodasParcelas : undefined
            }
            isEditing={isEditing}
          />
        )}

        {pedido.observacoes && (
          <ObservacoesSection observacoes={pedido.observacoes} />
        )}

        <PedidoActions
          id={id}
          isEditing={isEditing}
          isDeleting={isDeleting}
          setIsEditing={setIsEditing}
          setShowDeleteModal={setShowDeleteModal}
        />
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

const ErrorView = ({ error }: { error: string }) => (
  <div className="max-w-4xl mx-auto p-4">
    <Alert type="error" message={error} />
    <div className="mt-4">
      <Link
        to="/pedidos"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Voltar para lista
      </Link>
    </div>
  </div>
);

const NotFoundView = () => (
  <div className="max-w-4xl mx-auto p-4">
    <Alert
      type="info"
      message="Pedido não encontrado"
      actions={
        <Link
          to="/pedidos"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Voltar para lista
        </Link>
      }
    />
  </div>
);

const ObservacoesSection = ({ observacoes }: { observacoes: string }) => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Observações</h2>
    <p className="text-sm text-gray-700 whitespace-pre-line">{observacoes}</p>
  </div>
);

export default PedidoView;
