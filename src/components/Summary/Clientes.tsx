// components/ClientesSummary.tsx
import { Pedido } from "../../pages/Pedidos/types";
import { formatarMoeda } from "../../pages/Pedidos/pedidoUtils";

interface ClienteResumo {
  nome: string;
  documento: string;
  totalGasto: number;
  quantidadeTotal: number;
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
        racoes: {},
      };
    }

    acc[nomeCliente].totalGasto += pedido.totalPedido;

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
  const clientesOrdenados = Object.values(resumoClientes)
    .sort((a, b) => b.totalGasto - a.totalGasto)
    .slice(0, 5); // Top 5 clientes

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-3">Clientes que mais compram</h3>

      <div className="space-y-4">
        {clientesOrdenados.map((cliente) => (
          <div
            key={cliente.nome}
            className="border-b border-gray-200 pb-4 last:border-0"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{cliente.nome}</h4>
                {cliente.documento && (
                  <p className="text-xs text-gray-500">{cliente.documento}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total gasto</p>
                <p className="font-semibold text-green-600">
                  {formatarMoeda(cliente.totalGasto)}
                </p>
              </div>
            </div>

            <div className="ml-4">
              <p className="text-sm text-gray-500 mb-1">
                Rações mais compradas:
              </p>
              <ul className="space-y-1">
                {Object.entries(cliente.racoes)
                  .sort((a, b) => b[1].quantidade - a[1].quantidade)
                  .slice(0, 3) // Top 3 rações por cliente
                  .map(([racao, dados]) => (
                    <li key={racao} className="flex justify-between text-sm">
                      <span className="truncate">{racao}</span>
                      <span className="text-gray-600">
                        {dados.quantidade} un ({formatarMoeda(dados.total)})
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
