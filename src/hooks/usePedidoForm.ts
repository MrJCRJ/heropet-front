import { useState } from "react";
import { Pedido, PedidoStatus } from "../types/pedidos";
import { formatDateForInput } from "../utils/date";

export const usePedidoForm = (initialData?: Omit<Pedido, "_id">) => {
  const [formData, setFormData] = useState<Omit<Pedido, "_id">>(
    initialData || {
      tipo: "VENDA",
      status: PedidoStatus.PENDENTE, // Use o enum PedidoStatus
      documentoClienteFornecedor: "",
      nomeClienteFornecedor: "",
      dataPedido: formatDateForInput(new Date().toISOString()),
      dataEntrega: undefined, // Adicione campos opcionais
      itens: [],
      totalPedido: 0,
      temNotaFiscal: false,
      observacoes: "",
      parcelas: undefined, // Adicione campos opcionais
      condicaoPagamento: undefined, // Adicione campos opcionais
    }
  );

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showParcelamento, setShowParcelamento] = useState(false);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return {
    formData,
    setFormData,
    error,
    setError,
    isSubmitting,
    setIsSubmitting,
    showParcelamento,
    setShowParcelamento,
    quantidadeParcelas,
    setQuantidadeParcelas,
    handleChange,
  };
};
