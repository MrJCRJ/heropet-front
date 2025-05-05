import { useEffect, useState } from "react";
import { listarPedidos, removerPedido, Pedido } from "../../../api/pedidos";
import { FiltroPedido } from "./types";

export const usePedidoList = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroPedido>("TODOS");

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async (tipo?: FiltroPedido) => {
    setLoading(true);
    setError("");

    try {
      const response = await listarPedidos(tipo === "TODOS" ? undefined : tipo);
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

  return {
    pedidos,
    loading,
    error,
    pedidoParaExcluir,
    setPedidoParaExcluir,
    isDeleting,
    filtroAtivo,
    carregarPedidos,
    handleDeleteClick,
    confirmDelete,
  };
};
