import { AxiosError } from "axios";

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

export interface SubmitButtonProps {
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Adicione esta linha
}

export interface FornecedorFormFieldsProps {
  formData: FornecedorFormData;
  isLoading: boolean;
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
}

export interface CepFieldProps {
  value: string;
  onChange: (cep: string) => void;
  disabled?: boolean;
  onAddressFound?: (address: Omit<EnderecoViaCep, "cep">) => void; // Corrigido o nome para onAddressFound
  onFetchError?: (error: Error | AxiosError) => void;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
  debounceTime?: number;
}

export interface AddressFieldsProps {
  address: {
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    numero?: string;
    complemento?: string;
  };
  onComplementoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNumeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export type SafeFornecedorFormData = Omit<FornecedorFormData, "endereco"> & {
  endereco: Endereco;
};

export interface Endereco {
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}
