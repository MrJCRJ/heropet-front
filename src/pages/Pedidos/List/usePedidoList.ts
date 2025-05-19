import { useState, useCallback, useEffect } from "react";
import { listarPedidos } from "../../../api/pedidos";
import { FiltroPedido, FiltroStatus } from "../types";
import { ListarPedidosParams } from "../../../api/pedidos";
import { Pedido } from "../types";
import { OrdenacaoPedido } from "../types";

export const usePedidoList = () => {
  // Estados para filtros
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados para filtros
  const [filtroTipo, setFiltroTipo] = useState<FiltroPedido>("TODOS");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus | undefined>();
  const [ordenacao, setOrdenacao] = useState<OrdenacaoPedido>("data_desc");
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  // Função para carregar pedidos
  const carregarPedidos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: ListarPedidosParams = {
        tipo: filtroTipo === "TODOS" ? undefined : filtroTipo,
        status: filtroStatus,
        ordenacao,
        mes: selectedMonth,
        ano: selectedYear,
      };

      console.log("Enviando para API:", params); // Adicione este log
      const response = await listarPedidos(params);
      setPedidos(response);
    } catch (err) {
      setError("Erro ao carregar pedidos. Tente novamente mais tarde.");
      console.error("Erro ao carregar pedidos:", err);
    } finally {
      setLoading(false);
    }
  }, [filtroTipo, filtroStatus, ordenacao, selectedMonth, selectedYear]);

  // Efeito para carregar pedidos quando os filtros mudam
  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  const handleFilterChange = (
    tipo?: FiltroPedido,
    status?: FiltroStatus,
    ordem?: OrdenacaoPedido,
    mes?: number,
    ano?: number
  ) => {
    setFiltroTipo(tipo || "TODOS");
    setFiltroStatus(status);
    setOrdenacao(ordem || "data_desc");
    setSelectedMonth(mes);
    setSelectedYear(ano);
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
    selectedMonth,
    selectedYear,
    handleFilterChange,
    toggleOrdenacao,
  };
};
