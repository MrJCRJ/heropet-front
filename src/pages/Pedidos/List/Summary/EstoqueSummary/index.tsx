import { ResumoCard } from "./ResumoCard";
import { useResumoEstoque } from "../../../../../utils/estoque";
import { EstoqueSummaryProps } from "./types";
import { formatarMoeda } from "../../../../../utils/currency";
import {
  TooltipEstoqueCompleto,
  ProdutosMaisVendidos,
  TooltipProdutosStatus,
} from "./TooltipEstoque";

export const EstoqueSummary = ({ pedidos }: EstoqueSummaryProps) => {
  const {
    valorTotalEstoque,
    quantidadeTotal,
    produtosArray,
    produtosMaisVendidos,
    produtosEmFalta,
    produtosBaixoEstoque,
  } = useResumoEstoque(pedidos);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-3">
        Resumo de Estoque (baseado em pedidos)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ResumoCard
          titulo="Valor Total"
          valor={valorTotalEstoque}
          cor="blue"
          icone="cube"
          isMonetary
          tooltip={
            <>
              <p>Valor exato: {formatarMoeda(valorTotalEstoque)}</p>
              <p>Quantidade total: {quantidadeTotal} itens</p>
              <p>Baseado em {produtosArray.length} produtos diferentes</p>
            </>
          }
        />

        <ResumoCard
          titulo="Itens no Estoque"
          valor={quantidadeTotal}
          cor="gray"
          icone="cube"
          tooltip={
            <TooltipEstoqueCompleto
              produtos={produtosArray}
              quantidadeTotal={quantidadeTotal}
              maxItems={15}
            />
          }
          conteudoAdicional={
            <ProdutosMaisVendidos produtos={produtosMaisVendidos} />
          }
        />

        <ResumoCard
          titulo="Produtos em Falta"
          valor={produtosEmFalta}
          cor="red"
          icone="warning"
          tooltip={
            <TooltipProdutosStatus
              produtos={produtosArray.filter((p) => p.quantidade <= 0)}
              mensagem="Produtos com quantidade zerada ou negativa"
              recomendacao="Repor estoque urgentemente"
            />
          }
        />

        <ResumoCard
          titulo="Baixo Estoque"
          valor={produtosBaixoEstoque}
          cor="yellow"
          icone="warning"
          tooltip={
            <TooltipProdutosStatus
              produtos={produtosArray.filter(
                (p) => p.quantidade > 0 && p.quantidade < 5
              )}
              mensagem="Produtos com menos de 5 unidades"
              recomendacao="Verificar necessidade de reposição"
            />
          }
        />
      </div>
    </div>
  );
};
