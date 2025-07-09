import { useState, useEffect, useCallback } from "react";
import { listarFornecedores } from "../api/fornecedores";
import { Fornecedor } from "../types/fornecedores";

import { listarClientes, Cliente } from "../api/clientes";

export const useClientesFornecedores = (tipo: string) => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (tipo === "COMPRA") {
        const fornecedores = await listarFornecedores();

        setFornecedores(fornecedores || []);
        setClientes([]);
      } else if (tipo === "VENDA") {
        const clientes = await listarClientes();

        setClientes(clientes || []);
        setFornecedores([]);
      }
    } catch (err) {
      console.error("[useClientesFornecedores] Erro ao carregar dados:", err);
      setError(
        `Erro ao carregar ${tipo === "COMPRA" ? "fornecedores" : "clientes"}`
      );
    } finally {
      setLoading(false);
    }
  }, [tipo]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    fornecedores,
    clientes,
    loading,
    error,
    recarregar: carregarDados,
  };
};
