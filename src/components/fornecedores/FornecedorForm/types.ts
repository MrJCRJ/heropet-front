import { Endereco } from "../../../api/fornecedores";

export interface FornecedorFormProps {
  initialData?: FornecedorFormData;
  onSubmit: (data: FornecedorFormData) => void;
  isEditing?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

export interface EnderecoViaCep {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface FornecedorFormData {
  cnpj: string;
  nome?: string;
  nomeFantasia?: string;
  email?: string;
  telefone?: string;
  endereco?: Endereco;
}
