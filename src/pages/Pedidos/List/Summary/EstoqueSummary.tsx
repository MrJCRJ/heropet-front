// components/EstoqueSummary.tsx
import { formatarMoeda } from "../../pedidoUtils";
import { Pedido } from "../../types";
import { CubeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface EstoqueSummaryProps {
  pedidos: Pedido[];
}

export const EstoqueSummary = ({ pedidos }: EstoqueSummaryProps) => {
  // Processa todos os itens considerando o tipo de pedido
  const resumoProdutos = pedidos.reduce((acc, pedido) => {
    const fator = pedido.tipo === "COMPRA" ? 1 : -1; // COMPRA aumenta, VENDA diminui

    pedido.itens.forEach((item) => {
      if (!acc[item.produto]) {
        acc[item.produto] = {
          nome: item.produto,
          quantidade: 0,
          precoUnitario: item.precoUnitario,
          valorTotal: 0,
          vendas: 0, // Novo campo para rastrear vendas
        };
      }

      const quantidade = item.quantidade * fator;
      acc[item.produto].quantidade += quantidade;
      acc[item.produto].valorTotal += item.total * fator;

      // Contabiliza vendas (apenas para pedidos de VENDA)
      if (pedido.tipo === "VENDA") {
        acc[item.produto].vendas += item.quantidade;
      }
    });

    return acc;
  }, {} as Record<string, { nome: string; quantidade: number; precoUnitario: number; valorTotal: number; vendas: number }>);

  // Converte para array e calcula totais gerais
  const produtosArray = Object.values(resumoProdutos);

  // Ordena por vendas (mais vendidos primeiro)
  const produtosMaisVendidos = [...produtosArray]
    .sort((a, b) => b.vendas - a.vendas)
    .slice(0, 3); // Top 3 mais vendidos

  const valorTotalEstoque = produtosArray.reduce(
    (sum, produto) => sum + produto.valorTotal,
    0
  );
  const quantidadeTotal = produtosArray.reduce(
    (sum, produto) => sum + produto.quantidade,
    0
  );

  // Considera baixo estoque como menos de 5 itens
  const produtosEmFalta = produtosArray.filter((p) => p.quantidade <= 0).length;
  const produtosBaixoEstoque = produtosArray.filter(
    (p) => p.quantidade > 0 && p.quantidade < 5
  ).length;

  // Formata valores grandes de forma compacta
  const formatarValorCompacto = (valor: number) => {
    if (valor >= 1000000) return `${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `${(valor / 1000).toFixed(1)}K`;
    return formatarMoeda(valor);
  };

  // Função para cor da quantidade
  const getQuantidadeColor = (quantidade: number) => {
    if (quantidade <= 0) return "text-red-600";
    if (quantidade < 5) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-3">
        Resumo de Estoque (baseado em pedidos)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Valor Total do Estoque */}
        <div className="border-r border-gray-200 pr-4 group relative">
          <p className="text-sm text-gray-500">Valor Total</p>
          <div className="flex items-center">
            <p className="text-xl font-semibold text-blue-600">
              {formatarValorCompacto(valorTotalEstoque)}
            </p>
            <CubeIcon className="h-5 w-5 text-blue-600 ml-2" />
          </div>
          <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10 mt-1 w-64">
            <p>Valor exato: {formatarMoeda(valorTotalEstoque)}</p>
            <p>Quantidade total: {quantidadeTotal} itens</p>
            <p>Baseado em {produtosArray.length} produtos diferentes</p>
          </div>
        </div>

        {/* Quantidade Total com produtos mais vendidos */}
        <div className="border-r border-gray-200 pr-4 group relative">
          <p className="text-sm text-gray-500">Itens no Estoque</p>
          <div className="flex items-center">
            <p className="text-xl font-semibold text-gray-600">
              {quantidadeTotal}
            </p>
            <CubeIcon className="h-5 w-5 text-gray-600 ml-2" />
          </div>

          {/* Mostra os 3 produtos mais vendidos */}
          <div className="mt-2 space-y-1">
            {produtosMaisVendidos.map((produto) => (
              <div key={produto.nome} className="flex justify-between text-sm">
                <span className="truncate">{produto.nome}</span>
                <span
                  className={`font-medium ${getQuantidadeColor(
                    produto.quantidade
                  )}`}
                >
                  {produto.quantidade} un
                </span>
              </div>
            ))}
          </div>

          {/* Tooltip com lista completa */}
          <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10 mt-1 w-80 max-h-96 overflow-y-auto">
            <p className="font-semibold mb-1">
              Estoque completo ({produtosArray.length} produtos)
            </p>
            <div className="grid grid-cols-12 gap-1 mb-1 pb-1 border-b border-gray-600">
              <span className="col-span-8 font-medium">Produto</span>
              <span className="col-span-2 font-medium text-right">Estoque</span>
              <span className="col-span-2 font-medium text-right">Vendas</span>
            </div>
            {produtosArray
              .sort((a, b) => b.vendas - a.vendas)
              .map((produto) => (
                <div
                  key={produto.nome}
                  className="grid grid-cols-12 gap-1 py-1 border-b border-gray-700"
                >
                  <span className="col-span-8 truncate">{produto.nome}</span>
                  <span
                    className={`col-span-2 text-right ${getQuantidadeColor(
                      produto.quantidade
                    )}`}
                  >
                    {produto.quantidade}
                  </span>
                  <span className="col-span-2 text-right">
                    {produto.vendas}
                  </span>
                </div>
              ))}
            <div className="grid grid-cols-12 gap-1 mt-2 pt-1 border-t border-gray-600">
              <span className="col-span-8 font-medium">TOTAL</span>
              <span className="col-span-2 text-right font-medium">
                {quantidadeTotal}
              </span>
              <span className="col-span-2 text-right font-medium">
                {produtosArray.reduce((sum, p) => sum + p.vendas, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Produtos em Falta */}
        <div className="border-r border-gray-200 pr-4 group relative">
          <p className="text-sm text-gray-500">Produtos em Falta</p>
          <div className="flex items-center">
            <p className="text-xl font-semibold text-red-600">
              {produtosEmFalta}
            </p>
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 ml-2" />
          </div>
          <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10 mt-1 w-64">
            <p>Produtos com quantidade zerada ou negativa</p>
            <p>Recomendado: Repor estoque urgentemente</p>
            {produtosArray
              .filter((p) => p.quantidade <= 0)
              .map((p) => (
                <div key={p.nome} className="flex justify-between mt-1">
                  <span className="truncate">{p.nome}</span>
                  <span className="text-red-300">{p.quantidade} un</span>
                </div>
              ))}
          </div>
        </div>

        {/* Produtos com Baixo Estoque */}
        <div className="group relative">
          <p className="text-sm text-gray-500">Baixo Estoque</p>
          <div className="flex items-center">
            <p className="text-xl font-semibold text-yellow-600">
              {produtosBaixoEstoque}
            </p>
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 ml-2" />
          </div>
          <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10 mt-1 w-64">
            <p>Produtos com menos de 5 unidades</p>
            <p>Recomendado: Verificar necessidade de reposição</p>
            {produtosArray
              .filter((p) => p.quantidade > 0 && p.quantidade < 5)
              .map((p) => (
                <div key={p.nome} className="flex justify-between mt-1">
                  <span className="truncate">{p.nome}</span>
                  <span className="text-yellow-300">{p.quantidade} un</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
