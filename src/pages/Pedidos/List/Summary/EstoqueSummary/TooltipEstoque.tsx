import { ProdutoResumo } from "./types";
import { getQuantidadeColor } from "./Utils";

interface TooltipEstoqueCompletoProps {
  produtos: ProdutoResumo[];
  quantidadeTotal: number;
}

export const TooltipEstoqueCompleto = ({
  produtos,
  quantidadeTotal,
}: TooltipEstoqueCompletoProps) => (
  <>
    <p className="font-semibold mb-1">
      Estoque completo ({produtos.length} produtos)
    </p>
    <div className="grid grid-cols-12 gap-1 mb-1 pb-1 border-b border-gray-600">
      <span className="col-span-8 font-medium">Produto</span>
      <span className="col-span-2 font-medium text-right">Estoque</span>
      <span className="col-span-2 font-medium text-right">Vendas</span>
    </div>
    {produtos
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
          <span className="col-span-2 text-right">{produto.vendas}</span>
        </div>
      ))}
    <div className="grid grid-cols-12 gap-1 mt-2 pt-1 border-t border-gray-600">
      <span className="col-span-8 font-medium">TOTAL</span>
      <span className="col-span-2 text-right font-medium">
        {quantidadeTotal}
      </span>
      <span className="col-span-2 text-right font-medium">
        {produtos.reduce((sum, p) => sum + p.vendas, 0)}
      </span>
    </div>
  </>
);

interface TooltipProdutosStatusProps {
  produtos: ProdutoResumo[];
  mensagem: string;
  recomendacao: string;
}

export const TooltipProdutosStatus = ({
  produtos,
  mensagem,
  recomendacao,
}: TooltipProdutosStatusProps) => (
  <>
    <p>{mensagem}</p>
    <p>Recomendado: {recomendacao}</p>
    {produtos.map((p) => (
      <div key={p.nome} className="flex justify-between mt-1">
        <span className="truncate">{p.nome}</span>
        <span className="text-yellow-300">{p.quantidade} un</span>
      </div>
    ))}
  </>
);

interface ProdutosMaisVendidosProps {
  produtos: ProdutoResumo[];
}

export const ProdutosMaisVendidos = ({
  produtos,
}: ProdutosMaisVendidosProps) => (
  <>
    {produtos.map((produto) => (
      <div key={produto.nome} className="flex justify-between text-sm">
        <span className="truncate">{produto.nome}</span>
        <span
          className={`font-medium ${getQuantidadeColor(produto.quantidade)}`}
        >
          {produto.quantidade} un
        </span>
      </div>
    ))}
  </>
);
