import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPedidos, removerPedido, Pedido } from "../../api/pedidos";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";
import Alert from "../../components/Alert";

const PedidoList = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState<"TODOS" | "VENDA" | "COMPRA">(
    "TODOS"
  );

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async (tipo?: "VENDA" | "COMPRA") => {
    setLoading(true);
    setError("");
    try {
      const response = await listarPedidos(tipo);
      setPedidos(response.data);
      setFiltroAtivo(tipo || "TODOS");
    } catch (err) {
      setError("Erro ao carregar pedidos. Tente novamente mais tarde.");
      console.error("Erro ao carregar pedidos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (pedidoId: string) => {
    setPedidoParaExcluir(pedidoId);
  };

  const confirmDelete = async () => {
    if (!pedidoParaExcluir) return;

    setIsDeleting(true);
    try {
      await removerPedido(pedidoParaExcluir);
      setPedidos(pedidos.filter((pedido) => pedido._id !== pedidoParaExcluir));
    } catch (err) {
      setError("Erro ao excluir pedido. Tente novamente.");
      console.error("Erro ao excluir pedido:", err);
    } finally {
      setIsDeleting(false);
      setPedidoParaExcluir(null);
    }
  };

  const formatarData = (dataString: string) => {
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
      case "PAGO":
        return "bg-green-100 text-green-800";
      case "CANCELADO":
        return "bg-red-100 text-red-800";
      case "ATRASADO":
        return "bg-red-100 text-red-800";
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/fornecedores"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
          >
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Lista de Pedidos</h1>
        </div>
        <Link
          to="/pedidos/novo"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
        >
          Novo Pedido
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => carregarPedidos()}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filtroAtivo === "TODOS"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => carregarPedidos("VENDA")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filtroAtivo === "VENDA"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Vendas
        </button>
        <button
          onClick={() => carregarPedidos("COMPRA")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filtroAtivo === "COMPRA"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Compras
        </button>
      </div>

      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente/Fornecedor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <tr key={pedido._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {pedido._id?.substring(0, 6)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pedido.tipo === "VENDA" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Venda
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        Compra
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pedido.nomeClienteFornecedor || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatarData(pedido.dataPedido)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatarMoeda(pedido.totalPedido)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                        pedido.status
                      )}`}
                    >
                      {pedido.status || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <Link
                        to={`/pedidos/${pedido._id}`}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium rounded transition-colors"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/pedidos/${pedido._id}/editar`}
                        className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-blue-800 text-xs font-medium rounded transition-colors"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(pedido._id!)}
                        className="px-3 py-1 bg-red-200 hover:bg-red-300 text-red-800 text-xs font-medium rounded transition-colors"
                        disabled={isDeleting}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Nenhum pedido encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!pedidoParaExcluir}
        onClose={() => !isDeleting && setPedidoParaExcluir(null)}
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
              onClick={() => setPedidoParaExcluir(null)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-colors disabled:bg-red-400"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Excluindo...
                </span>
              ) : (
                "Confirmar"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PedidoList;
