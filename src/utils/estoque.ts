import { Pedido } from "../types/pedidos";
import { ProdutoResumo } from "../types/pedidos";

export const getQuantidadeColor = (quantidade: number) => {
  if (quantidade <= 0) return "text-red-600";
  if (quantidade < 5) return "text-yellow-600";
  return "text-green-600";
};

export const useResumoEstoque = (pedidos: Pedido[]) => {
  const resumoProdutos = pedidos.reduce((acc, pedido) => {
    const fator = pedido.tipo === "COMPRA" ? 1 : -1;

    pedido.itens.forEach((item) => {
      if (!acc[item.produto]) {
        acc[item.produto] = {
          nome: item.produto,
          quantidade: 0,
          precoUnitario: item.precoUnitario,
          valorTotal: 0,
          vendas: 0,
        };
      }

      const quantidade = item.quantidade * fator;
      acc[item.produto].quantidade += quantidade;
      acc[item.produto].valorTotal += item.total * fator;

      if (pedido.tipo === "VENDA") {
        acc[item.produto].vendas += item.quantidade;
      }
    });

    return acc;
  }, {} as Record<string, ProdutoResumo>);

  const produtosArray = Object.values(resumoProdutos);

  const produtosMaisVendidos = [...produtosArray]
    .sort((a, b) => b.vendas - a.vendas)
    .slice(0, 3);

  const valorTotalEstoque = produtosArray.reduce(
    (sum, produto) => sum + produto.valorTotal,
    0
  );

  const quantidadeTotal = produtosArray.reduce(
    (sum, produto) => sum + produto.quantidade,
    0
  );

  const produtosEmFalta = produtosArray.filter((p) => p.quantidade <= 0).length;
  const produtosBaixoEstoque = produtosArray.filter(
    (p) => p.quantidade > 0 && p.quantidade < 5
  ).length;

  return {
    valorTotalEstoque,
    quantidadeTotal,
    produtosArray,
    produtosMaisVendidos,
    produtosEmFalta,
    produtosBaixoEstoque,
  };
};
