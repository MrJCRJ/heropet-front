import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarFinanca } from "../api/financas";
import { Alert } from "./ui/Alert";
import { FinancaForm } from "./FinancaForm";

// Interface para os dados do formulário
interface FinancaFormData {
  tipo: "Investimento" | "Despesa";
  origem: string;
  descricao: string;
  data: string;
  status: "Pago" | "Pendente";
  valor: number;
}

export const FinancaFormPage = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (formData: FinancaFormData) => {
    try {
      await criarFinanca(formData);
      navigate("/financas");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao salvar finança");
      } else {
        setError("Erro ao salvar finança");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Nova Finança</h1>
      {error && <Alert type="error" message={error} className="mb-4" />}
      <FinancaForm onSubmit={handleSubmit} />
    </div>
  );
};
