export interface ClienteFormValues {
  cpfOuCnpj: string;
  nome?: string;
  telefone?: string;
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string; // Alterado de 'cidade' para 'localidade'
  uf?: string; // Alterado de 'estado' para 'uf'
  numero?: string;
  complemento?: string;
}

export interface EnderecoViaCep {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}
