import { FinancaForm } from "../../../components/FinancaForm";
import { Alert } from "../../../components/ui/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { criarFinanca, FinancaData } from "../../../api/financas";

export const FinancaCreate = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (formData: FinancaData) => {
    try {
      await criarFinanca(formData);
      navigate("/financas");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao criar finança");
      } else {
        setError("Erro ao criar finança");
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
