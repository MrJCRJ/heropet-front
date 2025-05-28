// components/ClientesSummary.tsx
import { Pedido } from "../../pages/Pedidos/types";
import { formatarMoeda } from "../../pages/Pedidos/pedidoUtils";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { TooltipGenerico } from "../TooltipGenerico";

interface ClienteResumo {
  nome: string;
  documento: string;
  totalGasto: number;
  quantidadeTotal: number;
  pedidosCount: number;
  racoes: Record<string, { quantidade: number; total: number }>;
}

interface ClientesSummaryProps {
  pedidos: Pedido[];
}

export const ClientesSummary = ({ pedidos }: ClientesSummaryProps) => {
  // Processa os pedidos para obter os dados dos clientes
  const resumoClientes = pedidos.reduce((acc, pedido) => {
    if (pedido.tipo !== "VENDA" || !pedido.nomeClienteFornecedor) return acc;

    const nomeCliente = pedido.nomeClienteFornecedor;
    const documentoCliente = pedido.documentoClienteFornecedor;

    if (!acc[nomeCliente]) {
      acc[nomeCliente] = {
        nome: nomeCliente,
        documento: documentoCliente,
        totalGasto: 0,
        quantidadeTotal: 0,
        pedidosCount: 0,
        racoes: {},
      };
    }

    acc[nomeCliente].totalGasto += pedido.totalPedido;
    acc[nomeCliente].pedidosCount += 1;

    pedido.itens.forEach((item) => {
      const nomeProduto = item.produto;
      acc[nomeCliente].quantidadeTotal += item.quantidade;

      if (!acc[nomeCliente].racoes[nomeProduto]) {
        acc[nomeCliente].racoes[nomeProduto] = {
          quantidade: 0,
          total: 0,
        };
      }

      acc[nomeCliente].racoes[nomeProduto].quantidade += item.quantidade;
      acc[nomeCliente].racoes[nomeProduto].total += item.total;
    });

    return acc;
  }, {} as Record<string, ClienteResumo>);

  // Ordena clientes por valor total gasto
  const clientesOrdenados = Object.values(resumoClientes).sort(
    (a, b) => b.totalGasto - a.totalGasto
  );

  // Obtém as top rações para mostrar no tooltip
  const getTopRacoes = (
    racoes: Record<string, { quantidade: number; total: number }>
  ) => {
    return Object.entries(racoes)
      .sort((a, b) => b[1].quantidade - a[1].quantidade)
      .slice(0, 5); // Top 5 rações no tooltip
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Clientes</h3>
        <span className="text-sm text-gray-500">
          {clientesOrdenados.length} clientes encontrados
        </span>
      </div>

      <div className="overflow-y-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Gasto
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
            {clientesOrdenados.map((cliente) => {
              const topRacoes = getTopRacoes(cliente.racoes);
              return (
                <tr key={cliente.nome} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <TooltipGenerico
                      conteudo={
                        <>
                          <p className="font-semibold mb-1">
                            Rações mais compradas:
                          </p>
                          <ul className="space-y-1">
                            {topRacoes.map(([racao, dados]) => (
                              <li key={racao} className="flex justify-between">
                                <span className="truncate">{racao}</span>
                                <span>
                                  {dados.quantidade} un (
                                  {formatarMoeda(dados.total)})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      }
                      icone={false}
                      className="w-full"
                    >
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {cliente.nome}
                          </p>
                          {cliente.documento && (
                            <p className="text-xs text-gray-500">
                              {cliente.documento}
                            </p>
                          )}
                        </div>
                        <InformationCircleIcon className="ml-2 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      </div>
                    </TooltipGenerico>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-semibold text-green-600">
                    {formatarMoeda(cliente.totalGasto)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-gray-500">
                    {cliente.quantidadeTotal}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-gray-500">
                    {cliente.pedidosCount}
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
