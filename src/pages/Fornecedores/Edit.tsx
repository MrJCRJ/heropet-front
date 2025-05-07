import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarFornecedor,
  atualizarFornecedor,
  type Fornecedor,
} from "../../api/fornecedores";
import FornecedorForm from "../../components/FornecedorForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";

const FornecedorEditPage = () => {
  const { cnpj } = useParams<{ cnpj: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Fornecedor | null>(null);

  useEffect(() => {
    const carregarFornecedor = async () => {
      try {
        if (!cnpj) throw new Error("CNPJ não fornecido");

        setIsLoading(true);
        setError(null);

        const response = await buscarFornecedor(cnpj);
        setInitialData(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar fornecedor"
        );
      } finally {
        setIsLoading(false);
      }
    };

    carregarFornecedor();
  }, [cnpj]);

  const handleSubmit = async (formData: Fornecedor) => {
    try {
      if (!cnpj) throw new Error("CNPJ não fornecido");

      setIsSubmitting(true);
      setError(null);

      await atualizarFornecedor(cnpj, formData);
      navigate(`/fornecedores/${cnpj}`, {
        state: {
          success: true,
          message: "Fornecedor atualizado com sucesso!",
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar fornecedor"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          type="error"
          message={error}
          onClose={() => navigate("/fornecedores")}
        />
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          type="info"
          message="Fornecedor não encontrado"
          actions={
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Voltar
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Voltar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <FornecedorForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isEditing={true}
          isLoading={isSubmitting}
          error={error}
        />
      </div>
    </div>
  );
};

export default FornecedorEditPage;
