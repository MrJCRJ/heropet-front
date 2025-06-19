// components/ParceirosSummary.tsx
import { Pedido } from "../../types";
import { formatarMoeda } from "../../../../utils/currency";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { TooltipGenerico } from "../../../../components/TooltipGenerico";

interface ParceiroResumo {
  nome: string;
  documento: string;
  totalTransacionado: number;
  quantidadeTotal: number;
  pedidosCount: number;
  produtos: Record<string, { quantidade: number; total: number }>;
  tipo: "CLIENTE" | "FORNECEDOR";
}

interface ParceirosSummaryProps {
  pedidos: Pedido[];
}

export const ParceirosSummary = ({ pedidos }: ParceirosSummaryProps) => {
  // Processa os pedidos para obter dados de clientes e fornecedores
  const resumoParceiros = pedidos.reduce((acc, pedido) => {
    if (!pedido.nomeClienteFornecedor) return acc;

    const nomeParceiro = pedido.nomeClienteFornecedor;
    const documentoParceiro = pedido.documentoClienteFornecedor;
    const tipoParceiro = pedido.tipo === "VENDA" ? "CLIENTE" : "FORNECEDOR";

    if (!acc[nomeParceiro]) {
      acc[nomeParceiro] = {
        nome: nomeParceiro,
        documento: documentoParceiro,
        totalTransacionado: 0,
        quantidadeTotal: 0,
        pedidosCount: 0,
        produtos: {},
        tipo: tipoParceiro,
      };
    }

    const fator = tipoParceiro === "CLIENTE" ? 1 : -1;
    acc[nomeParceiro].totalTransacionado += pedido.totalPedido * fator;
    acc[nomeParceiro].pedidosCount += 1;

    pedido.itens.forEach((item) => {
      const nomeProduto = item.produto;
      acc[nomeParceiro].quantidadeTotal += item.quantidade * fator;

      if (!acc[nomeParceiro].produtos[nomeProduto]) {
        acc[nomeParceiro].produtos[nomeProduto] = {
          quantidade: 0,
          total: 0,
        };
      }

      acc[nomeParceiro].produtos[nomeProduto].quantidade +=
        item.quantidade * fator;
      acc[nomeParceiro].produtos[nomeProduto].total += item.total * fator;
    });

    return acc;
  }, {} as Record<string, ParceiroResumo>);

  // Ordena parceiros por valor absoluto total transacionado
  const parceirosOrdenados = Object.values(resumoParceiros).sort(
    (a, b) => Math.abs(b.totalTransacionado) - Math.abs(a.totalTransacionado)
  );

  // Obtém os top produtos para mostrar no tooltip
  const getTopProdutos = (
    produtos: Record<string, { quantidade: number; total: number }>,
    tipo: "CLIENTE" | "FORNECEDOR"
  ) => {
    return Object.entries(produtos)
      .sort((a, b) => Math.abs(b[1].quantidade) - Math.abs(a[1].quantidade))
      .slice(0, 5) // Top 5 produtos no tooltip
      .map(([produto, dados]) => ({
        produto,
        quantidade: tipo === "CLIENTE" ? dados.quantidade : -dados.quantidade,
        total: tipo === "CLIENTE" ? dados.total : -dados.total,
      }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Clientes e Fornecedores</h3>
        <span className="text-sm text-gray-500">
          {parceirosOrdenados.length} parceiros encontrados
        </span>
      </div>

      <div className="overflow-y-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parceiro (Tipo)
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Transacionado
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Itens
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedidos
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parceirosOrdenados.map((parceiro) => {
              const topProdutos = getTopProdutos(
                parceiro.produtos,
                parceiro.tipo
              );
              const corTotal =
                parceiro.totalTransacionado >= 0
                  ? "text-green-600"
                  : "text-red-600";
              const iconeTipo = parceiro.tipo === "CLIENTE" ? "↑" : "↓";

              return (
                <tr
                  key={`${parceiro.nome}-${parceiro.tipo}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <TooltipGenerico
                      conteudo={
                        <>
                          <p className="font-semibold mb-1">
                            {parceiro.tipo === "CLIENTE"
                              ? "Produtos mais comprados:"
                              : "Produtos mais fornecidos:"}
                          </p>
                          <ul className="space-y-1">
                            {topProdutos.map(
                              ({ produto, quantidade, total }) => (
                                <li
                                  key={produto}
                                  className="flex justify-between"
                                >
                                  <span className="truncate">{produto}</span>
                                  <span>
                                    {quantidade} un ({formatarMoeda(total)})
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      }
                      icone={false}
                      className="w-full"
                    >
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {parceiro.nome}
                            <span
                              className={`ml-2 text-xs ${
                                parceiro.tipo === "CLIENTE"
                                  ? "text-blue-600"
                                  : "text-purple-600"
                              }`}
                            >
                              ({parceiro.tipo})
                            </span>
                          </p>
                          {parceiro.documento && (
                            <p className="text-xs text-gray-500">
                              {parceiro.documento}
                            </p>
                          )}
                        </div>
                        <InformationCircleIcon className="ml-2 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      </div>
                    </TooltipGenerico>
                  </td>
                  <td
                    className={`px-4 py-3 whitespace-nowrap text-right font-semibold ${corTotal}`}
                  >
                    {formatarMoeda(parceiro.totalTransacionado)} {iconeTipo}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-gray-500">
                    {parceiro.quantidadeTotal}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-gray-500">
                    {parceiro.pedidosCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
