import { useState } from "react";
import { FormHeader } from "./FormHeader";
import { FormBasics } from "./FormBasics";
import { FormItems } from "./FormItems";
import { FormActions } from "./FormActions";
import { FormParcelamento } from "./FormParcelamento";
import { usePedidoForm } from "./usePedidoForm";
import { Pedido } from "../../pages/Pedidos/types";
import { useParcelamento } from "./useParcelamento";

interface PedidoFormProps {
  initialData?: Omit<Pedido, "_id">;
  onSubmit: (pedido: Omit<Pedido, "_id">) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

const PedidoForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: PedidoFormProps) => {
  const [error, setError] = useState("");

  const {
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    showParcelamento,
    setShowParcelamento,
    quantidadeParcelas,
    setQuantidadeParcelas,
    parcelamentoSemanal,
    setParcelamentoSemanal,
    handleChange,
  } = usePedidoForm(initialData);

  const { calcularParcelas } = useParcelamento(
    formData.totalPedido,
    formData.dataPedido,
    quantidadeParcelas,
    parcelamentoSemanal
  );

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
      // Calcular parcelas se o parcelamento estiver ativado
      const parcelas = showParcelamento
        ? calcularParcelas()
        : formData.parcelas;

      // Criar objeto completo com todas as propriedades necessárias
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
        parcelas: parcelas,
        condicaoPagamento: showParcelamento
          ? "PARCELADO"
          : formData.condicaoPagamento,
      };

      await onSubmit(dataToSubmit);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao processar pedido. Verifique os dados e tente novamente.";
      setError(errorMessage);
      console.error("Erro ao processar pedido:", err);
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
            totalPedido={formData.totalPedido}
            dataPedido={formData.dataPedido}
            quantidadeParcelas={quantidadeParcelas}
            setQuantidadeParcelas={setQuantidadeParcelas}
            parcelamentoSemanal={parcelamentoSemanal}
            setParcelamentoSemanal={setParcelamentoSemanal}
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
