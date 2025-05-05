import { useState, useEffect, useCallback } from "react";
import { listarPedidos } from "../../../api/pedidos";
import { FiltroPedido, FiltroStatus } from "./types";
import { ListarPedidosParams } from "../../../api/pedidos";
import { Pedido } from "../../Home/types/pedidos";

// Definindo um tipo unificado para ordenação
export type OrdenacaoPedido = "data_asc" | "data_desc";

export const usePedidoList = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filtroTipo, setFiltroTipo] = useState<FiltroPedido>("TODOS");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus | undefined>();
  const [ordenacao, setOrdenacao] = useState<OrdenacaoPedido>("data_desc");

  const carregarPedidos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: ListarPedidosParams = {
        tipo: filtroTipo === "TODOS" ? undefined : filtroTipo,
        status: filtroStatus,
        ordenacao,
      };

      const response = await listarPedidos(params);
      setPedidos(response);
    } catch (err) {
      setError("Erro ao carregar pedidos. Tente novamente mais tarde.");
      console.error("Erro ao carregar pedidos:", err);
    } finally {
      setLoading(false);
    }
  }, [filtroTipo, filtroStatus, ordenacao]);

  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  const handleFilterChange = (
    tipo?: FiltroPedido,
    status?: FiltroStatus,
    ordem?: OrdenacaoPedido
  ) => {
    // Atualize os estados corretamente
    setFiltroTipo(tipo || "TODOS"); // "TODOS" é o valor padrão
    setFiltroStatus(status);
    setOrdenacao(ordem || "data_desc");
  };

  const toggleOrdenacao = () => {
    setOrdenacao(ordenacao === "data_desc" ? "data_asc" : "data_desc");
  };

  return {
    pedidos,
    loading,
    error,
    filtroTipo,
    filtroStatus,
    ordenacao,
    handleFilterChange,
    toggleOrdenacao,
    carregarPedidos, // Esta linha deve existir
  };
};
