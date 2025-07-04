import { FieldProps } from "formik";
import { Pedido } from "./pedidos";

// ======================================
// Seção 1: Tipos de Entidades Principais
// ======================================

export interface Cliente {
  _id?: string;
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
  endereco: Endereco; // Alterado para objeto único
}

export interface ClienteFornecedorItem {
  nome: string;
  documento: string;
}

// ======================================
// Seção 2: Tipos para Formulários
// ======================================

export type ClienteFormValues = {
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
  endereco: Endereco;
};

export type ClienteFormData = {
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
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

export type SafeClienteFormData = Omit<ClienteFormData, "endereco"> & {
  endereco: Endereco;
};

export interface ClienteFormProps {
  initialData?: ClienteFormData;
  onSubmit: (data: ClienteFormData) => void;
  isEditing?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

export interface FormBasicsProps {
  formData: Omit<Pedido, "_id">;
  isEditing: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
}

// ======================================
// Seção 3: Tipos para Componentes de Formulário
// ======================================

export interface InputFieldProps {
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  form: {
    errors: Record<string, string>;
    touched: Record<string, boolean>;
  };
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  optional?: boolean;
}

export interface CepFieldProps extends FieldProps {
  label: string;
  disabled?: boolean;
}

export interface SubmitButtonProps {
  isSubmitting: boolean;
  isEdit: boolean;
  className?: string;
}

export interface FormErrorProps {
  error: string | null;
}

// ======================================
// Seção 4: Tipos para Componentes Específicos
// ======================================

export interface ClienteFornecedorSelectProps {
  tipo: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (nome: string, documento: string) => void;
  disabled?: boolean;
  items: ClienteFornecedorItem[];
  loading?: boolean;
}

export interface DocumentoNomeSectionProps
  extends Pick<
    FormBasicsProps,
    "formData" | "isEditing" | "setFormData" | "handleChange"
  > {
  items: ClienteFornecedorItem[];
  loading: boolean;
  onSelect: (nome: string, documento: string) => void;
}
