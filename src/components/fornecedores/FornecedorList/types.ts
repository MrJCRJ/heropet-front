import { Fornecedor } from "../../../api/fornecedores";

export interface FornecedorListProps {
  fornecedores: Fornecedor[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (cnpj: string) => Promise<void> | void;
}
