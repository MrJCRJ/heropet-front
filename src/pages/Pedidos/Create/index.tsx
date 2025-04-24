import { useNavigate } from "react-router-dom";
import { criarPedido } from "../../../api/pedidos";
import PedidoForm from "../../../components/PedidoForm";

const PedidoCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (pedido: Parameters<typeof criarPedido>[0]) => {
    await criarPedido(pedido);
    navigate("/pedidos");
  };

  return (
    <div>
      <h1>Criar Novo Pedido</h1>
      <PedidoForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/pedidos")}
      />
    </div>
  );
};

export default PedidoCreate;
