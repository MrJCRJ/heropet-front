import { useState, useEffect } from "react";
import { buscarPedido, atualizarPedido } from "../api/pedidos";
import { Pedido } from "../types/pedidos";

export const usePedido = (id?: string) => {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      await atualizarPedido(pedido._id!, { parcelas: parcelasAtualizadas });
      setPedido(pedidoAtualizado);
    } catch (err) {
      setError("Erro ao atualizar parcela. Tente novamente.");
      console.error("Erro ao atualizar parcela:", err);
    }
  };

  const handleRemoveTodasParcelas = async () => {
    if (!pedido || !pedido.parcelas) return;
    try {
      const pedidoAtualizado = { ...pedido, parcelas: [] };
      await atualizarPedido(pedido._id!, { parcelas: [] });
      setPedido(pedidoAtualizado);
    } catch (err) {
      setError("Erro ao remover parcelas. Tente novamente.");
      console.error("Erro ao remover parcelas:", err);
    }
  };

  return {
    pedido,
    loading,
    error,
    handleTogglePago,
    handleRemoveTodasParcelas,
    setPedido,
  };
};
