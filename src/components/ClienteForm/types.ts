// File src/components/ClienteForm/types.ts

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
