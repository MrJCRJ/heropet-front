import { FieldProps } from "formik";

export interface Cliente {
  _id?: string;
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
  cep: string;
  numero: string;
  complemento?: string;
}

export interface ClienteFormValues {
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
  cep: string;
  numero: string;
  complemento?: string;
}

export interface EnderecoViaCep {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

export interface ClienteFormProps {
  initialValues?: ClienteFormValues;
  isEdit?: boolean;
  onSubmit?: (values: ClienteFormValues) => Promise<void> | void;
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

export interface CepFieldProps extends FieldProps {
  label: string;
  disabled?: boolean;
}

export interface ClienteFormFieldsProps {
  isEdit: boolean;
}

export interface FormErrorProps {
  error: string | null;
}

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

export interface SubmitButtonProps {
  isSubmitting: boolean;
  isEdit: boolean;
  className?: string;
}
