import { useState, useEffect } from "react";
import { obterFinanca } from "../../../api/financas";
import { FinancaData } from "../../../types/financas";

interface UseFinancaReturn {
  financa: FinancaData | null;
  loading: boolean;
  error: string;
}

export const useFinanca = (id: string | undefined): UseFinancaReturn => {
  const [financa, setFinanca] = useState<FinancaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregarFinanca = async () => {
      try {
        if (!id) return;

        const response = await obterFinanca(id);
        setFinanca(response);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao carregar finança";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    carregarFinanca();
  }, [id]);

  return { financa, loading, error };
};
