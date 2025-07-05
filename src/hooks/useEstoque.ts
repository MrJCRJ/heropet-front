import { Pedido } from "../types/pedidos";
import { ProdutoResumo } from "../types/pedidos";

export const getQuantidadeColor = (quantidade: number) => {
  if (quantidade <= 0) return "text-red-600";
  if (quantidade < 5) return "text-yellow-600";
  return "text-green-600";
};

export const useResumoEstoque = (pedidos: Pedido[]) => {
  // Cálculo da data de corte (90 dias atrás)
  const hoje = new Date();
  const data90DiasAtras = new Date(hoje);
  data90DiasAtras.setDate(hoje.getDate() - 90);

  // Objeto para armazenar vendas recentes por produto
  const vendasUltimos90Dias: Record<string, number> = {};

  // Calcular vendas dos últimos 90 dias
  pedidos.forEach((pedido) => {
    if (
      pedido.tipo === "VENDA" &&
      new Date(pedido.dataPedido) >= data90DiasAtras
    ) {
      pedido.itens.forEach((item) => {
        const produtoId = item.produto;
        vendasUltimos90Dias[produtoId] =
          (vendasUltimos90Dias[produtoId] || 0) + item.quantidade;
      });
    }
  });

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

  const produtosArray = Object.values(resumoProdutos).map((produto) => {
    // Calcular estoque mínimo personalizado
    const vendas90Dias = vendasUltimos90Dias[produto.nome] || 0;
    const mediaDiaria = vendas90Dias / 90;

    // Definir dias de cobertura baseado no giro do produto
    let diasCobertura = 30; // padrão para baixo giro
    if (mediaDiaria > 10) diasCobertura = 14; // alto giro: 2 semanas
    else if (mediaDiaria > 5) diasCobertura = 21; // médio giro: 3 semanas

    // Calcular estoque mínimo (mínimo de 3 unidades)
    const estoqueMinimo = Math.max(3, Math.ceil(mediaDiaria * diasCobertura));

    return {
      ...produto,
      vendasUltimos90Dias,
      estoqueMinimo,
    };
  });

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
  // Novo cálculo para baixo estoque usando estoque mínimo personalizado
  const produtosBaixoEstoque = produtosArray.filter(
    (p) => p.quantidade > 0 && p.quantidade < p.estoqueMinimo
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
