import httpClient from "./httpClient";
import { Fornecedor, EnderecoViaCep } from "../types/fornecedores";

export const criarFornecedor = (
  fornecedor: Omit<Fornecedor, "cnpj"> & { cnpj: string }
) => {
  return httpClient.post("/fornecedores", fornecedor);
};

export const listarFornecedores = async (): Promise<Fornecedor[]> => {
  const response = await httpClient.get("/fornecedores");
  return response.data || response; // Tenta response.data primeiro, se não, retorna response diretamente
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

// Nova função para buscar endereço por CEP
export const buscarEnderecoPorCep = async (
  cep: string
): Promise<EnderecoViaCep> => {
  // Remove caracteres não numéricos
  const cepNumerico = cep.replace(/\D/g, "");

  // Faz a requisição para a API ViaCEP
  const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar endereço");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return {
    cep: data.cep,
    logradouro: data.logradouro,
    complemento: data.complemento,
    bairro: data.bairro,
    localidade: data.localidade,
    uf: data.uf,
  };
};
