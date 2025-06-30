import axios from "axios";
import { FinancaData } from "../types/financas";

const API_URL = import.meta.env.VITE_API_URL;

export const criarFinanca = async (financaData: FinancaData) => {
  const response = await axios.post(`${API_URL}/financas`, financaData);
  return response.data;
};

export const listarFinancas = async (): Promise<FinancaData[]> => {
  const response = await axios.get(`${API_URL}/financas`);
  return response.data;
};

// Adicione esta nova função
export const obterFinanca = async (id: string): Promise<FinancaData> => {
  const response = await axios.get(`${API_URL}/financas/${id}`);
  return response.data;
};

export const atualizarFinanca = async (
  id: string,
  financaData: Partial<FinancaData>
) => {
  const response = await axios.patch(`${API_URL}/financas/${id}`, financaData);
  return response.data;
};

export const deletarFinanca = async (id: string) => {
  const response = await axios.delete(`${API_URL}/financas/${id}`);
  return response.data;
};
