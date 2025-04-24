import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarPedido, atualizarPedido, Pedido } from "../../../api/pedidos";
import PedidoForm from "../../../components/PedidoForm";

const PedidoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleSubmit = async (dadosAtualizados: Omit<Pedido, "_id">) => {
    try {
      if (!id) throw new Error("ID não fornecido");
      await atualizarPedido(id, dadosAtualizados);
      navigate(`/pedidos/${id}`);
    } catch (err) {
      setError("Erro ao atualizar pedido");
      console.error(err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!pedido) return <div>Pedido não encontrado</div>;

  return (
    <div>
      <h1>Editar Pedido</h1>
      <PedidoForm
        initialData={pedido}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/pedidos/${id}`)}
        isEditing={true}
      />
    </div>
  );
};

export default PedidoEdit;
