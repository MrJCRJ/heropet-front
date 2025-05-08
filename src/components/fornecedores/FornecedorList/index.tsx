// src/components/fornecedores/FornecedorList/index.tsx
import { useState } from "react";
import { FornecedorTable } from "./FornecedorTable";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ErrorState from "./ErrorState";
import { EmptyState } from "./EmptyState";
import type { FornecedorListProps } from "./types";

const FornecedorList = (props: FornecedorListProps) => {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (cnpj: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      return;
    }

    setDeleting(cnpj);
    try {
      await props.onDelete?.(cnpj);
    } finally {
      setDeleting(null);
    }
  };

  if (props.isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Carregando lista de fornecedores...</p>
      </div>
    );

  if (props.error) return <ErrorState error={props.error} />;
  if (props.fornecedores.length === 0) return <EmptyState />;

  return (
    <div className="w-full overflow-x-auto mt-6 shadow-sm rounded-lg border border-gray-200">
      <FornecedorTable
        fornecedores={props.fornecedores}
        onDelete={props.onDelete && handleDelete}
        deleting={deleting}
      />
    </div>
  );
};

export default FornecedorList;
