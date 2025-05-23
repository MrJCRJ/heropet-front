import { useState, useCallback, useEffect } from "react";
import { listarPedidos } from "../../../../api/pedidos";
import { FiltroPedido, FiltroStatus } from "../../types";
import { ListarPedidosParams } from "../../../../api/pedidos";
import { Pedido } from "../../types";
import { OrdenacaoPedido } from "../../types";

// Chaves para armazenamento local
const STORAGE_KEYS = {
  FILTER_TYPE: "pedidoFilterType",
  FILTER_STATUS: "pedidoFilterStatus",
  SORT: "pedidoSort",
  MONTH: "pedidoMonth",
  YEAR: "pedidoYear",
};

export const usePedidoList = () => {
  // Função segura para carregar do localStorage
  const loadFromStorage = <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error parsing stored ${key}:`, error);
      return defaultValue;
    }
  };

  // Estados para filtros com valores iniciais do localStorage
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filtroTipo, setFiltroTipo] = useState<FiltroPedido>(
    loadFromStorage(STORAGE_KEYS.FILTER_TYPE, "TODOS")
  );
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus | undefined>(
    loadFromStorage(STORAGE_KEYS.FILTER_STATUS, undefined)
  );
  const [ordenacao, setOrdenacao] = useState<OrdenacaoPedido>(
    loadFromStorage(STORAGE_KEYS.SORT, "data_desc")
  );
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    loadFromStorage(STORAGE_KEYS.MONTH, undefined)
  );
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    loadFromStorage(STORAGE_KEYS.YEAR, undefined)
  );

  // Salva no localStorage sempre que os filtros mudam
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FILTER_TYPE, JSON.stringify(filtroTipo));
  }, [filtroTipo]);

  useEffect(() => {
    if (filtroStatus !== undefined) {
      localStorage.setItem(
        STORAGE_KEYS.FILTER_STATUS,
        JSON.stringify(filtroStatus)
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.FILTER_STATUS);
    }
  }, [filtroStatus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SORT, JSON.stringify(ordenacao));
  }, [ordenacao]);

  useEffect(() => {
    if (selectedMonth !== undefined) {
      localStorage.setItem(STORAGE_KEYS.MONTH, JSON.stringify(selectedMonth));
    } else {
      localStorage.removeItem(STORAGE_KEYS.MONTH);
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (selectedYear !== undefined) {
      localStorage.setItem(STORAGE_KEYS.YEAR, JSON.stringify(selectedYear));
    } else {
      localStorage.removeItem(STORAGE_KEYS.YEAR);
    }
  }, [selectedYear]);

  // Restante do seu código...
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

      const response = await listarPedidos(params);
      setPedidos(response);
    } catch (err) {
      setError("Erro ao carregar pedidos. Tente novamente mais tarde.");
      console.error("Erro ao carregar pedidos:", err);
    } finally {
      setLoading(false);
    }
  }, [filtroTipo, filtroStatus, ordenacao, selectedMonth, selectedYear]);

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
