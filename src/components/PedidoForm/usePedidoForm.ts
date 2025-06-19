import { useState } from "react";
import { Pedido } from "../../pages/Pedidos/types";
import { formatDateForInput } from "../../utils";

export const usePedidoForm = (initialData?: Omit<Pedido, "_id">) => {
  const [formData, setFormData] = useState<Omit<Pedido, "_id">>(
    initialData || {
      tipo: "VENDA",
      status: "PENDENTE",
      documentoClienteFornecedor: "",
      nomeClienteFornecedor: "",
      dataPedido: formatDateForInput(new Date().toISOString()),
      itens: [],
      totalPedido: 0,
      temNotaFiscal: false,
      observacoes: "",
    }
  );

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showParcelamento, setShowParcelamento] = useState(false);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState(1);
  const [parcelamentoSemanal, setParcelamentoSemanal] = useState(true);

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
    parcelamentoSemanal,
    setParcelamentoSemanal,
    handleChange,
  };
};
