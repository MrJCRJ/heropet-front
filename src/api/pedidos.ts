import httpClient from "./httpClient";
import {
  Pedido,
  FiltroPedido,
  FiltroStatus,
} from "../components/PedidoForm/pedidos";

const OrdenacaoValues = ["data_asc", "data_desc"] as const;
export type OrdenacaoPedido = (typeof OrdenacaoValues)[number];

/**
 * Interface para itens do pedido
 */

/**
 * Parâmetros para listagem de pedidos
 */
export interface ListarPedidosParams {
  tipo?: FiltroPedido;
  status?: FiltroStatus;
  ordenacao?: OrdenacaoPedido;
  page?: number;
  limit?: number;
}

/**
 * Filtro por período
 */
export interface PeriodFilter {
  type: "month" | "year";
  month?: number;
  year: number;
}

export const FiltroStatusValues = [
  "PENDENTE",
  "PROCESSANDO",
  "PAGO",
  "CANCELADO",
  "ATRASADO",
] as const;

/**
 * Cria um novo pedido
 * @param pedido Dados do pedido a ser criado
 */
export const criarPedido = (pedido: Omit<Pedido, "_id">) => {
  return httpClient.post("/pedidos", pedido);
};

/**
 * Lista pedidos com filtros opcionais
 * @param params Parâmetros de filtragem
 * @returns Promise com array de pedidos
 */
export const listarPedidos = async (
  params?: ListarPedidosParams
): Promise<Pedido[]> => {
  try {
    // Inicializa objeto para parâmetros limpos
    const cleanParams: Record<string, string> = {};

    // Filtro por tipo
    if (params?.tipo && params.tipo !== "TODOS") {
      cleanParams.tipo = params.tipo;
    }

    // Filtro por status (com validação segura)
    if (params?.status && FiltroStatusValues.includes(params.status)) {
      cleanParams.status = params.status;
    }

    // Filtro por ordenação
    if (params?.ordenacao && OrdenacaoValues.includes(params.ordenacao)) {
      cleanParams.ordenacao = params.ordenacao;
    }

    // Paginação
    if (params?.page && Number.isInteger(params.page) && params.page > 0) {
      cleanParams.page = params.page.toString();
    }

    if (params?.limit && Number.isInteger(params.limit) && params.limit > 0) {
      cleanParams.limit = params.limit.toString();
    }

    // Faz a requisição
    const response = await httpClient.get<Pedido[]>("/pedidos", {
      params: cleanParams,
    });

    // Garante que sempre retorne um array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    return []; // Retorna array vazio em caso de erro
  }
};

/**
 * Busca um pedido específico por ID
 * @param id ID do pedido
 */
export const buscarPedido = (id: string) => {
  return httpClient.get(`/pedidos/${id}`);
};

/**
 * Atualiza um pedido existente
 * @param id ID do pedido
 * @param dados Dados parciais para atualização
 */
export const atualizarPedido = (id: string, dados: Partial<Pedido>) => {
  return httpClient.put(`/pedidos/${id}`, dados);
};

/**
 * Remove um pedido
 * @param id ID do pedido
 */
export const removerPedido = (id: string) => {
  return httpClient.delete(`/pedidos/${id}`);
};
