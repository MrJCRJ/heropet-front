import { Pedido } from "../types/pedidos";
import { formatarData } from "../utils/date";
import { getStatusColor } from "../utils/status";

export const PedidoInfoSection = ({ pedido }: { pedido: Pedido }) => (
  <div className="p-6 border-b border-gray-200">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Informações</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InfoItem
        label="Tipo"
        value={
          pedido.tipo === "VENDA" ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              Venda
            </span>
          ) : (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              Compra
            </span>
          )
        }
      />

      <InfoItem
        label="Status"
        value={
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
              pedido.status
            )}`}
          >
            {pedido.status}
          </span>
        }
      />

      <InfoItem
        label="Documento"
        value={pedido.documentoClienteFornecedor || "-"}
      />
      <InfoItem label="Nome" value={pedido.nomeClienteFornecedor || "-"} />
      <InfoItem
        label="Data do Pedido"
        value={formatarData(pedido.dataPedido)}
      />
      <InfoItem
        label="Data de Entrega"
        value={formatarData(pedido.dataEntrega)}
      />

      <InfoItem
        label="Nota Fiscal"
        value={
          pedido.temNotaFiscal ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              Sim
            </span>
          ) : (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
              Não
            </span>
          )
        }
      />
    </div>
  </div>
);

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-sm text-gray-900">{value}</p>
  </div>
);
