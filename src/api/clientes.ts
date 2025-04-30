import httpClient from "./httpClient";

interface Cliente {
  _id?: string;
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
  cep: string;
  numero: string;
  complemento?: string;
}

export const listarClientes = async (): Promise<Cliente[]> => {
  const response = await httpClient.get("/clientes");
  return response.data || response; // Tenta response.data primeiro, se não, retorna response diretamente
};

export const buscarCliente = async (cpfOuCnpj: string) => {
  const response = await httpClient.get(`/clientes/${cpfOuCnpj}`);
  return response.data;
};

export const criarCliente = async (
  cliente: Omit<Cliente, "complemento"> & { complemento?: string }
) => {
  const response = await httpClient.post("/clientes", cliente);
  return response.data;
};

export const atualizarCliente = async (
  cpfOuCnpj: string,
  cliente: Partial<Cliente>
) => {
  const response = await httpClient.put(`/clientes/${cpfOuCnpj}`, cliente);
  return response.data;
};

export const excluirCliente = async (cpfOuCnpj: string) => {
  const response = await httpClient.delete(`/clientes/${cpfOuCnpj}`);
  return response.data;
};

export type { Cliente };
