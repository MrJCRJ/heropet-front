// src/components/fornecedores/FornecedorList/types.ts
import type { Fornecedor } from "../../../api/fornecedores";

export interface FornecedorListProps {
  fornecedores: Fornecedor[];
  isLoading: boolean;
  error: string | null;
  onRowClick: (cnpj: string) => void; // Adicione esta linha
}
