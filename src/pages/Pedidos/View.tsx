import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarPedido,
  removerPedido,
  atualizarPedido,
} from "../../api/pedidos";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { ErrorView } from "../../components/ui/ErrorView";
import { NotFoundView } from "../../components/ui/NotFoundView";
import { ObservacoesSection } from "../../components/ui/ObservacoesSection";
import { ParcelasView } from "../../components/ParcelasView";
import { ItensPedidoView } from "../../components/ItensPedidoView";
import { Pedido } from "../../types/pedidos";
import { PedidoHeader } from "../../components/PedidoHeader";
import { PedidoInfoSection } from "../../components/PedidoInfoSection";
import { PedidoActions } from "../../components/PedidoActions";
import { DeleteModal } from "../../components/DeleteModal";

// === COMPONENTE PRINCIPAL ===
export const PedidoView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // === CARREGAR PEDIDO ===
  useEffect(() => {
    if (!id) return;

    const carregarPedido = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await buscarPedido(id);
        setPedido(response.data);
      } catch (err) {
        console.error("Erro ao carregar pedido:", err);
        setError("Erro ao carregar pedido. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarPedido();
  }, [id]);

  // === HANDLERS ===
  const atualizarParcelas = async (parcelasAtualizadas: Pedido["parcelas"]) => {
    if (!pedido || !pedido._id) return;

    await atualizarPedido(pedido._id, { parcelas: parcelasAtualizadas });
    setPedido({ ...pedido, parcelas: parcelasAtualizadas });
  };

  const handleTogglePago = async (numeroParcela: number) => {
    if (!pedido?.parcelas) return;

    const parcelasAtualizadas = pedido.parcelas.map((parcela) =>
      parcela.numero === numeroParcela
        ? { ...parcela, pago: !parcela.pago }
        : parcela
    );

    try {
      await atualizarParcelas(parcelasAtualizadas);
    } catch (err) {
      console.error("Erro ao atualizar parcela:", err);
      setError("Erro ao atualizar parcela. Tente novamente.");
    }
  };

  const handleRemoveTodasParcelas = async () => {
    try {
      await atualizarParcelas([]);
    } catch (err) {
      console.error("Erro ao remover parcelas:", err);
      setError("Erro ao remover parcelas. Tente novamente.");
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
      console.error("Erro ao excluir pedido:", err);
      setError("Erro ao excluir pedido. Tente novamente.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // === RENDER ===
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

        {!!pedido.parcelas?.length && (
          <ParcelasView
            parcelas={pedido.parcelas}
            onTogglePago={handleTogglePago}
            onRemoveTodasParcelas={
              isEditing ? handleRemoveTodasParcelas : undefined
            }
            isEditing={isEditing}
          />
        )}

        {!!pedido.observacoes && (
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

export default PedidoView;
