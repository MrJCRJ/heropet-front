import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarPedido,
  removerPedido,
  atualizarPedido,
} from "../../api/pedidos";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";
import { ParcelasView } from "./ParcelasView";
import { ItensPedidoView } from "./ItensPedidoView";
import { Pedido, PedidoStatus } from "./types";
import { formatarData, getStatusColor } from "./pedidoUtils";

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

      await atualizarPedido(pedido._id!, {
        parcelas: parcelasAtualizadas,
      });

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
        state: {
          success: true,
          message: "Pedido excluído com sucesso!",
        },
      });
    } catch (err) {
      setError("Erro ao excluir pedido. Tente novamente.");
      console.error("Erro ao excluir pedido:", err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
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
  }

  if (!pedido) {
    return (
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
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Detalhes do Pedido</h1>
        <Link
          to="/pedidos"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium"
        >
          Voltar para lista
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {/* Informações Básicas */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Informações
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Tipo</p>
              <p className="mt-1 text-sm text-gray-900">
                {pedido.tipo === "VENDA" ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Venda
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    Compra
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1 text-sm">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                    pedido.status as PedidoStatus
                  )}`}
                >
                  {pedido.status}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Documento</p>
              <p className="mt-1 text-sm text-gray-900">
                {pedido.documentoClienteFornecedor || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p className="mt-1 text-sm text-gray-900">
                {pedido.nomeClienteFornecedor || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Data do Pedido
              </p>
              <p className="mt-1 text-sm text-gray-900">
                {formatarData(pedido.dataPedido)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Data de Entrega
              </p>
              <p className="mt-1 text-sm text-gray-900">
                {formatarData(pedido.dataEntrega)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nota Fiscal</p>
              <p className="mt-1 text-sm text-gray-900">
                {pedido.temNotaFiscal ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Sim
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                    Não
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Itens do Pedido */}
        <ItensPedidoView
          itens={pedido.itens}
          totalPedido={pedido.totalPedido}
        />

        {/* Parcelas */}
        {pedido.parcelas && pedido.parcelas.length > 0 && (
          <ParcelasView
            parcelas={pedido.parcelas}
            onTogglePago={handleTogglePago}
            isEditing={isEditing}
          />
        )}

        {/* Observações */}
        {pedido.observacoes && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Observações
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pedido.observacoes}
            </p>
          </div>
        )}

        {/* Ações */}
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
      </div>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Exclusão"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja excluir este pedido?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-colors"
            >
              Confirmar Exclusão
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PedidoView;
