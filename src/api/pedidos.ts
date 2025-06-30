import httpClient from "./httpClient";
import { Pedido } from "../pages/Pedidos/types";
import {
  FiltroStatus,
  FiltroStatusValues,
  ListarPedidosParams,
  OrdenacaoValues,
} from "../types/pedidos";

export const criarPedido = (pedido: Omit<Pedido, "_id">) => {
  return httpClient.post("/pedidos", pedido);
};

export const listarPedidos = async (
  params?: ListarPedidosParams
): Promise<Pedido[]> => {
  try {
    const cleanParams: Record<string, string> = {};

    if (params?.tipo && params.tipo !== "TODOS") {
      cleanParams.tipo = params.tipo;
    }

    if (
      params?.status &&
      FiltroStatusValues.includes(params.status as FiltroStatus)
    ) {
      cleanParams.status = params.status;
    }

    if (params?.ordenacao && OrdenacaoValues.includes(params.ordenacao)) {
      cleanParams.ordenacao = params.ordenacao;
    }

    if (params?.mes) {
      cleanParams.mes = params.mes.toString();
    }

    if (params?.ano) {
      cleanParams.ano = params.ano.toString();
    }

    if (params?.page && params.page > 0) {
      cleanParams.page = params.page.toString();
    }

    if (params?.limit && params.limit > 0) {
      cleanParams.limit = params.limit.toString();
    }

    const response = await httpClient.get<Pedido[]>("/pedidos", {
      params: cleanParams,
    });

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    return [];
  }
};

export const buscarPedido = (id: string) => {
  return httpClient.get(`/pedidos/${id}`);
};

export const atualizarPedido = (id: string, dados: Partial<Pedido>) => {
  return httpClient.put(`/pedidos/${id}`, dados);
};

export const removerPedido = (id: string) => {
  return httpClient.delete(`/pedidos/${id}`);
};
