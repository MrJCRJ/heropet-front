import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarPedido, removerPedido, Pedido } from "../../../api/pedidos";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Alert from "../../../components/Alert";

const PedidoView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatarData = (dataString?: string) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  const formatarMoeda = (valor?: number) => {
    if (valor === undefined || valor === null) return "R$ 0,00";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "FINALIZADO":
        return "bg-green-100 text-green-800";
      case "CANCELADO":
        return "bg-red-100 text-red-800";
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const carregarPedido = async () => {
      try {
        if (!id) throw new Error("ID não fornecido");
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Detalhes do Pedido
          </h1>
          <p className="text-gray-500 text-sm">ID: {pedido._id}</p>
        </div>
        <Link
          to="/pedidos"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
        >
          Voltar para lista
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {/* Seção de Informações Básicas */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Informações Básicas
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
                    pedido.status
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

        {/* Seção de Itens do Pedido */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Itens do Pedido
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço Unitário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pedido.itens.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.produto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.quantidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarMoeda(item.precoUnitario)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarMoeda(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                  >
                    <strong>Total do Pedido:</strong>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <strong>{formatarMoeda(pedido.totalPedido)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

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
          <p className="text-gray-600 text-sm">
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-colors disabled:bg-red-400"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Excluindo...
                </span>
              ) : (
                "Confirmar Exclusão"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PedidoView;
