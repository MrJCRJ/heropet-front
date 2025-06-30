import { useState, useEffect } from "react";
import { listarFinancas } from "../../../api/financas";
import { FinancaData } from "../../../types/financas";

interface UseFinancaListReturn {
  financas: FinancaData[];
  loading: boolean;
  error: string;
}

export const useFinancaList = (): UseFinancaListReturn => {
  const [financas, setFinancas] = useState<FinancaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregarFinancas = async () => {
      try {
        const response = await listarFinancas();
        setFinancas(response);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao carregar finanças";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    carregarFinancas();
  }, []);

  return { financas, loading, error };
};
