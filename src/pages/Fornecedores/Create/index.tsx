import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarFornecedor } from "../../../api/fornecedores";
import FornecedorForm from "../../../components/FornecedorForm";
import type { FornecedorFormData } from "../../../components/FornecedorForm/types";

const FornecedorCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FornecedorFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await criarFornecedor(formData);
      navigate("/fornecedores", {
        state: {
          successMessage: "Fornecedor criado com sucesso!",
        },
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar fornecedor";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <FornecedorForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default FornecedorCreate;
