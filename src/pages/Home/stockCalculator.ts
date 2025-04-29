// File: src/pages/Home/stockCalculator.ts

import { Pedido } from "../../api/pedidos";
import { MockProduct } from "./mockData";

interface StockHistory {
  [productName: string]: {
    monthly: {
      [year: number]: {
        [month: number]: number; // Saldo no final do mês
      };
    };
    current: number; // Saldo atual
  };
}

export const calculateStock = (
  products: MockProduct[],
  orders: Pedido[]
): StockHistory => {
  const history: StockHistory = {};

  // Inicializa com estoque inicial
  products.forEach((product) => {
    history[product.name] = {
      monthly: {},
      current: product.initialStock, // Agora usando a propriedade correta
    };
  });

  // Processa todos os pedidos em ordem cronológica
  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(a.dataPedido).getTime() - new Date(b.dataPedido).getTime()
  );

  sortedOrders.forEach((order) => {
    const date = new Date(order.dataPedido);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    order.itens.forEach((item) => {
      if (!history[item.produto]) {
        history[item.produto] = {
          monthly: {},
          current: 0,
        };
      }

      // Atualiza estoque atual
      if (order.tipo === "COMPRA") {
        history[item.produto].current += item.quantidade;
      } else {
        history[item.produto].current = Math.max(
          0,
          history[item.produto].current - item.quantidade
        );
      }

      // Atualiza histórico mensal
      if (!history[item.produto].monthly[year]) {
        history[item.produto].monthly[year] = {};
      }
      history[item.produto].monthly[year][month] =
        history[item.produto].current;
    });
  });

  return history;
};
