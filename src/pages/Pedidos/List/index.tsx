import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPedidos, removerPedido, Pedido } from "../../../api/pedidos";
import styles from "./styles.module.css";
import Modal from "../../../components/Modal";

const PedidoList = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

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
    } catch (err) {
      setError("Erro ao excluir pedido");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setPedidoParaExcluir(null);
    }
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link
          to="/fornecedores"
          className={`${styles.button} ${styles.secondary}`}
        >
          Voltar
        </Link>
        <h1>Lista de Pedidos</h1>
        <Link
          to="/pedidos/novo"
          className={`${styles.button} ${styles.success}`}
        >
          Novo Pedido
        </Link>
      </div>

      <div className={styles.filters}>
        <button
          onClick={() => carregarPedidos()}
          className={`${styles.button} ${styles.secondary}`}
        >
          Todos
        </button>
        <button
          onClick={() => carregarPedidos("VENDA")}
          className={`${styles.button} ${styles.secondary}`}
        >
          Vendas
        </button>
        <button
          onClick={() => carregarPedidos("COMPRA")}
          className={`${styles.button} ${styles.secondary}`}
        >
          Compras
        </button>
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
              <td>{formatarData(pedido.dataPedido)}</td>
              <td>R$ {pedido.totalPedido?.toFixed(2)}</td>
              <td>{pedido.status}</td>
              <td>
                <Link
                  to={`/pedidos/${pedido._id}`}
                  className={styles.actionLink}
                >
                  Ver
                </Link>
                <Link
                  to={`/pedidos/${pedido._id}/editar`}
                  className={styles.actionLink}
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDeleteClick(pedido._id!)}
                  className={styles.dangerLink}
                  disabled={isDeleting}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              className={`${styles.button} ${styles.secondary}`}
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className={`${styles.button} ${styles.danger}`}
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Confirmar"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PedidoList;
