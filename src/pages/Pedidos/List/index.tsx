import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarPedidos, removerPedido, Pedido } from "../../../api/pedidos";
import styles from "./styles.module.css";
import Modal from "../../../components/Modal"; // Importe o componente Modal

const PedidoList = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async (tipo?: "VENDA" | "COMPRA") => {
    setLoading(true);
    try {
      const response = await listarPedidos(tipo);
      setPedidos(response.data);
    } catch (err) {
      setError("Erro ao carregar pedidos");
      console.error(err);
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
      navigate("/pedidos", {
        state: { message: "Pedido excluído com sucesso!" },
      });
    } catch (err) {
      setError("Erro ao excluir pedido");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setPedidoParaExcluir(null);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Lista de Pedidos</h1>
      <Link to="/pedidos/novo" className={styles.novoPedido}>
        Novo Pedido
      </Link>

      <div className={styles.filtros}>
        <button onClick={() => carregarPedidos()}>Todos</button>
        <button onClick={() => carregarPedidos("VENDA")}>Vendas</button>
        <button onClick={() => carregarPedidos("COMPRA")}>Compras</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Cliente/Fornecedor</th>
            <th>Data</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido._id}>
              <td>{pedido._id?.substring(0, 6)}...</td>
              <td>{pedido.tipo}</td>
              <td>{pedido.nomeClienteFornecedor}</td>
              <td>{new Date(pedido.dataPedido).toLocaleDateString()}</td>
              <td>R$ {pedido.totalPedido.toFixed(2)}</td>
              <td>{pedido.status}</td>
              <td className={styles.actions}>
                <Link to={`/pedidos/${pedido._id}`} className={styles.action}>
                  Ver
                </Link>
                <Link
                  to={`/pedidos/${pedido._id}/editar`}
                  className={styles.action}
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDeleteClick(pedido._id!)}
                  className={styles.deleteAction}
                  disabled={isDeleting}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmação */}
      <Modal
        isOpen={!!pedidoParaExcluir}
        onClose={() => setPedidoParaExcluir(null)}
        title="Confirmar Exclusão"
      >
        <div className={styles.modalContent}>
          <p>Tem certeza que deseja excluir este pedido?</p>
          <p>Esta ação não pode ser desfeita.</p>
          <div className={styles.modalActions}>
            <button
              onClick={() => setPedidoParaExcluir(null)}
              className={styles.modalCancel}
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className={styles.modalConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PedidoList;
