import { useState, useEffect } from "react";
import { FormHeader } from "./FormHeader";
import { FormBasics } from "./FormBasics";
import { FormItems } from "./FormItems";
import { FormActions } from "./FormActions";
import { FormParcelamento } from "./FormParcelamento";
import { usePedidoForm } from "./usePedidoForm";
import { Pedido, Parcela } from "../../types/pedidos";
import { useParcelamento } from "./useParcelamento";
import { PedidoFormProps } from "../../types/pedidos";

const PedidoForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: PedidoFormProps) => {
  const [error, setError] = useState("");
  const [parcelas, setParcelas] = useState<Parcela[]>([]);

  const {
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    showParcelamento,
    setShowParcelamento,
    quantidadeParcelas,
    setQuantidadeParcelas,
    handleChange,
  } = usePedidoForm(initialData);

  const { calcularParcelas } = useParcelamento(
    formData.totalPedido,
    quantidadeParcelas
  );

  useEffect(() => {
    if (showParcelamento && formData.totalPedido > 0) {
      const novasParcelas = calcularParcelas();
      setParcelas(novasParcelas);
    }
  }, [
    showParcelamento,
    formData.totalPedido,
    quantidadeParcelas,
    calcularParcelas,
  ]);

  const handleDateChange = (parcelaNumero: number, newDate: string) => {
    setParcelas((prev) =>
      prev.map((p) =>
        p.numero === parcelaNumero ? { ...p, dataVencimento: newDate } : p
      )
    );
  };

  const formatDateForBackend = (dateString: string) => {
    if (!dateString) return new Date().toISOString();
    const date = new Date(dateString);
    return date.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (formData.itens.length === 0) {
      setError("Adicione pelo menos um item ao pedido");
      setIsSubmitting(false);
      return;
    }

    try {
      // Usar as parcelas do estado local
      const parcelasToSubmit = showParcelamento
        ? parcelas // Usar o estado local, não recálculo
        : formData.parcelas;

      // Criar objeto completo
      const dataToSubmit: Omit<Pedido, "_id"> = {
        tipo: formData.tipo,
        status: formData.status,
        documentoClienteFornecedor: formData.documentoClienteFornecedor,
        nomeClienteFornecedor: formData.nomeClienteFornecedor,
        dataPedido: formatDateForBackend(formData.dataPedido),
        dataEntrega: formData.dataEntrega
          ? formatDateForBackend(formData.dataEntrega)
          : undefined,
        itens: formData.itens,
        totalPedido: formData.totalPedido,
        temNotaFiscal: formData.temNotaFiscal,
        observacoes: formData.observacoes,
        parcelas: parcelasToSubmit, // Usar as parcelas corretas
        condicaoPagamento: showParcelamento
          ? "PARCELADO"
          : formData.condicaoPagamento,
      };

      await onSubmit(dataToSubmit);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormHeader isEditing={isEditing} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <FormBasics
            formData={formData}
            isEditing={isEditing}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <FormItems
            formData={formData}
            setFormData={setFormData}
            setError={setError}
            hasParcelamento={showParcelamento}
            setHasParcelamento={setShowParcelamento}
          />
        </div>

        {showParcelamento && (
          <FormParcelamento
            quantidadeParcelas={quantidadeParcelas}
            setQuantidadeParcelas={setQuantidadeParcelas}
            parcelas={parcelas}
            onDateChange={handleDateChange}
          />
        )}

        <FormActions
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          onCancel={onCancel}
        />
      </form>
    </div>
  );
};

export default PedidoForm;
