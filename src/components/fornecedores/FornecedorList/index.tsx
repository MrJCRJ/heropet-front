// src/components/fornecedores/FornecedorList/index.tsx
import { FornecedorTable } from "./FornecedorTable";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { Alert } from "../../ui/Alert";
import type { FornecedorListProps } from "../../../types/fornecedores";

const FornecedorList = ({
  fornecedores,
  isLoading,
  error,
  onRowClick,
}: FornecedorListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Carregando lista de fornecedores...</p>
      </div>
    );
  }

  if (error)
    return (
      <Alert
        type="error"
        message={
          typeof error === "string"
            ? error
            : "Ocorreu um erro ao carregar os fornecedores"
        }
        className="mb-4"
      />
    );

  return (
    <div className="w-full overflow-x-auto mt-6 shadow-sm rounded-lg border border-gray-200">
      <FornecedorTable fornecedores={fornecedores} onRowClick={onRowClick} />
    </div>
  );
};

export default FornecedorList;
