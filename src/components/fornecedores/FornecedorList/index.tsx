// src/components/fornecedores/FornecedorList/index.tsx
import { FornecedorTable } from "./FornecedorTable";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ErrorState from "./ErrorState";
import { EmptyState } from "./EmptyState";
import type { FornecedorListProps } from "./types";

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

  if (error) return <ErrorState error={error} />;
  if (fornecedores.length === 0) return <EmptyState />;

  return (
    <div className="w-full overflow-x-auto mt-6 shadow-sm rounded-lg border border-gray-200">
      <FornecedorTable fornecedores={fornecedores} onRowClick={onRowClick} />
    </div>
  );
};

export default FornecedorList;
