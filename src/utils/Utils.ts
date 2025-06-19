import { Pedido } from "../pages/Pedidos/types";
import { ProdutoResumo } from "../pages/Pedidos/List/Summary/EstoqueSummary/types";
import { formatarMoeda } from "./pedidoUtils";

export const formatarValorCompacto = (
  valor: number,
  isMonetary: boolean = true
) => {
  if (isMonetary) {
    if (valor >= 1000000) return `${formatarMoeda(valor / 1000000)}M`;
    if (valor >= 1000) return `${formatarMoeda(valor / 1000)}K`;
    return formatarMoeda(valor);
  } else {
    // Para quantidades (não monetárias)
    if (valor >= 1000000) return `${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `${(valor / 1000).toFixed(1)}K`;
    return valor.toString();
  }
};

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
