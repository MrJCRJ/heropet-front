import httpClient from "./httpClient";

export interface Endereco {
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

export interface Fornecedor {
  cnpj: string;
  nome?: string;
  nomeFantasia?: string;
  email?: string;
  telefone?: string;
  endereco?: Endereco;
}

export const criarFornecedor = (
  fornecedor: Omit<Fornecedor, "cnpj"> & { cnpj: string }
) => {
  return httpClient.post("/fornecedores", fornecedor);
};

export const listarFornecedores = () => {
  return httpClient.get("/fornecedores");
};

export const buscarFornecedor = (cnpj: string) => {
  return httpClient.get(`/fornecedores/${cnpj}`);
};

export const atualizarFornecedor = (
  cnpj: string,
  dados: Partial<Fornecedor>
) => {
  return httpClient.put(`/fornecedores/${cnpj}`, dados);
};

export const removerFornecedor = async (cnpj: string) => {
  return httpClient.delete(`/fornecedores/${cnpj}`);
};
