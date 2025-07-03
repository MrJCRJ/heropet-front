import { AxiosError } from "axios";
import { ReactNode } from "react";

// ======================================
// Seção 1: Tipos de Entidades Principais
// ======================================

export interface Fornecedor {
  cnpj: string;
  nome?: string;
  nomeFantasia?: string;
  email?: string;
  telefone?: string;
  endereco?: Endereco;
}

export interface Endereco {
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

// ======================================
// Seção 2: Tipos para Formulários
// ======================================

export interface FornecedorFormData {
  cnpj: string;
  nome?: string;
  nomeFantasia?: string;
  email?: string;
  telefone?: string;
  endereco?: Endereco;
}

export type SafeFornecedorFormData = Omit<FornecedorFormData, "endereco"> & {
  endereco: Endereco;
};

export interface FornecedorFormProps {
  initialData?: FornecedorFormData;
  onSubmit: (data: FornecedorFormData) => void;
  isEditing?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

// ======================================
// Seção 3: Tipos para Componentes de Formulário
// ======================================

export interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface CepFieldProps {
  value: string;
  onChange: (cep: string) => void;
  disabled?: boolean;
  onAddressFound?: (address: Omit<EnderecoViaCep, "cep">) => void;
  onFetchError?: (error: Error | AxiosError) => void;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
  debounceTime?: number;
}

export interface AddressFieldsProps {
  address: Endereco;
  onComplementoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export interface SubmitButtonProps {
  isLoading?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface FornecedorFormFieldsProps {
  formData: FornecedorFormData;
  isLoading: boolean;
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
}

// ======================================
// Seção 4: Tipos para Listagem e Tabelas
// ======================================

export interface FornecedorListProps {
  fornecedores: Fornecedor[];
  isLoading: boolean;
  error: string | null;
  onRowClick: (cnpj: string) => void;
}

export interface FornecedorTableProps {
  fornecedores: Fornecedor[];
  onRowClick: (cnpj: string) => void;
}

export interface FornecedorRowProps {
  fornecedor: Fornecedor;
  onClick: () => void;
}

// ======================================
// Seção 5: Tipos para Estado e Erros
// ======================================

export interface ErrorStateProps {
  error: string;
}
