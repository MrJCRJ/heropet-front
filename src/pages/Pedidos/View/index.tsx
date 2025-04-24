import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarPedido, removerPedido, Pedido } from "../../../api/pedidos";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";

const PedidoView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Função para formatar a data corretamente, considerando o fuso horário
  const formatarData = (dataString: string) => {
    if (!dataString) return "";

    // Cria a data no fuso horário local
    const data = new Date(dataString);

    // Corrige para o fuso horário local
    const dataLocal = new Date(
      data.getTime() + data.getTimezoneOffset() * 60000
    );

    return dataLocal.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    const carregarPedido = async () => {
      try {
        if (!id) throw new Error("ID não fornecido");
        const response = await buscarPedido(id);
        setPedido(response.data);
      } catch (err) {
        setError("Erro ao carregar pedido");
        console.error(err);
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
        state: { message: "Pedido excluído com sucesso!" },
      });
    } catch (err) {
      setError("Erro ao excluir pedido");
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!pedido)
    return <div className={styles.notFound}>Pedido não encontrado</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Detalhes do Pedido</h1>
        <Link to="/pedidos" className={styles.backButton}>
          Voltar para lista
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.section}>
          <h2>Informações Básicas</h2>
          <div className={styles.infoGrid}>
            <div>
              <strong>Tipo:</strong>
              <span>{pedido.tipo === "VENDA" ? "Venda" : "Compra"}</span>
            </div>
            <div>
              <strong>Status:</strong>
              <span
                className={`${styles.status} ${
                  styles[pedido.status.toLowerCase()]
                }`}
              >
                {pedido.status}
              </span>
            </div>
            <div>
              <strong>Documento:</strong>
              <span>{pedido.documentoClienteFornecedor}</span>
            </div>
            <div>
              <strong>Nome:</strong>
              <span>{pedido.nomeClienteFornecedor}</span>
            </div>
            <div>
              <strong>Data do Pedido:</strong>
              <span>{formatarData(pedido.dataPedido)}</span>
            </div>
            {pedido.dataEntrega && (
              <div>
                <strong>Data de Entrega:</strong>
                <span>{formatarData(pedido.dataEntrega)}</span>
              </div>
            )}
            <div>
              <strong>Nota Fiscal:</strong>
              <span>{pedido.temNotaFiscal ? "Sim" : "Não"}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Itens do Pedido</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedido.itens.map((item, index) => (
                <tr key={index}>
                  <td>{item.produto}</td>
                  <td>{item.quantidade}</td>
                  <td>R$ {item.precoUnitario.toFixed(2)}</td>
                  <td>R$ {item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className={styles.totalLabel}>
                  <strong>Total do Pedido:</strong>
                </td>
                <td className={styles.totalValue}>
                  <strong>R$ {pedido.totalPedido.toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {pedido.observacoes && (
          <div className={styles.section}>
            <h2>Observações</h2>
            <p className={styles.observacoes}>{pedido.observacoes}</p>
          </div>
        )}

        <div className={styles.actions}>
          <Link to={`/pedidos/${id}/editar`} className={styles.editButton}>
            Editar Pedido
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className={styles.deleteButton}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir Pedido"}
          </button>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Exclusão"
      >
        <div className={styles.modalContent}>
          <p>Tem certeza que deseja excluir este pedido?</p>
          <p>Esta ação não pode ser desfeita.</p>

          <div className={styles.modalActions}>
            <button
              onClick={() => setShowDeleteModal(false)}
              className={styles.modalCancelButton}
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className={styles.modalConfirmButton}
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

export default PedidoView;
