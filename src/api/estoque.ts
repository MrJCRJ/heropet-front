// File: src/api/estoque.ts
import httpClient from "./httpClient";
import { EstoqueHistorico } from "../types/estoque";

export const getHistoricoEstoque = async (): Promise<EstoqueHistorico[]> => {
  const response = await httpClient.get("/estoque/historico");
  return response.data;
};
