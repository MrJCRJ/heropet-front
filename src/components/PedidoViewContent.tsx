import { Pedido } from "../types/pedidos";
import { ParcelasView } from "./ParcelasView";
import { ItensPedidoView } from "./ItensPedidoView";
import { ObservacoesSection } from "./ObservacoesSection"; // Atualize o import
import { PedidoInfoSection } from "./PedidoInfoSection";

interface PedidoViewContentProps {
  pedido: Pedido;
  isEditing: boolean;
  onTogglePago: (numeroParcela: number) => void;
  onRemoveTodasParcelas?: () => void;
}

export const PedidoViewContent = ({
  pedido,
  isEditing,
  onTogglePago,
  onRemoveTodasParcelas,
}: PedidoViewContentProps) => (
  <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
    <PedidoInfoSection pedido={pedido} />

    <ItensPedidoView itens={pedido.itens} totalPedido={pedido.totalPedido} />

    {pedido.parcelas && pedido.parcelas.length > 0 && (
      <ParcelasView
        parcelas={pedido.parcelas}
        onTogglePago={onTogglePago}
        onRemoveTodasParcelas={isEditing ? onRemoveTodasParcelas : undefined}
        isEditing={isEditing}
      />
    )}

    {pedido.observacoes && (
      <ObservacoesSection observacoes={pedido.observacoes} />
    )}
  </div>
);
