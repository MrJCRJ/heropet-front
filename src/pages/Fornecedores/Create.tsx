import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarFornecedor } from "../../api/fornecedores";
import FornecedorForm from "../../components/fornecedores/FornecedorForm";
import type { FornecedorFormData } from "../../types/fornecedores";

const FornecedorCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FornecedorFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepara os dados para enviar, convertendo email vazio para undefined
      const dataToSend = {
        ...formData,
        email: formData.email?.trim() || undefined, // Converte string vazia para undefined
        endereco: formData.endereco
          ? {
              ...formData.endereco,
              // Garante que campos vazios do endereço sejam undefined
              complemento: formData.endereco.complemento || undefined,
              numero: formData.endereco.numero || undefined,
            }
          : undefined,
      };

      await criarFornecedor(dataToSend);
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
