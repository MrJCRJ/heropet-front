import { useState } from "react";
import { Pedido } from "../../pages/Home/types/pedidos";
import FormHeader from "./FormHeader";
import FormBasics from "./FormBasics";
import FormItems from "./FormItems";
import { FormActions } from "./FormActions"; // Corrigido para importação nomeada
import { FormParcelamento } from "./FormParcelamento";

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
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  const formatDateForBackend = (dateString: string) => {
    if (!dateString) return new Date().toISOString();
    const date = new Date(dateString);
    return date.toISOString();
  };

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

  const [, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showParcelamento, setShowParcelamento] = useState(false);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState(1);
  const [parcelamentoSemanal, setParcelamentoSemanal] = useState(true);

  const calcularParcelas = () => {
    const valorParcela = formData.totalPedido / quantidadeParcelas;
    const parcelas = [];
    const dataBase = new Date(formData.dataPedido);

    for (let i = 1; i <= quantidadeParcelas; i++) {
      const dataVencimento = new Date(dataBase);

      if (parcelamentoSemanal) {
        dataVencimento.setDate(dataBase.getDate() + i * 7);
      } else {
        dataVencimento.setDate(dataBase.getDate() + i * 30);
      }

      parcelas.push({
        numero: i,
        dataVencimento: formatDateForInput(dataVencimento.toISOString()),
        valor:
          i === quantidadeParcelas
            ? formData.totalPedido - valorParcela * (quantidadeParcelas - 1)
            : valorParcela,
        pago: false,
      });
    }

    return parcelas;
  };

  const handleConfirmarParcelamento = () => {
    const parcelas = calcularParcelas();
    setFormData({
      ...formData,
      parcelas,
      condicaoPagamento: "PARCELADO",
    });
    setShowParcelamento(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (formData.itens.length === 0) {
      setError("Adicione pelo menos um item ao pedido");
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        dataPedido: formatDateForBackend(formData.dataPedido),
        dataEntrega: formData.dataEntrega
          ? formatDateForBackend(formData.dataEntrega)
          : undefined,
      };
      await onSubmit(dataToSubmit);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao processar pedido. Verifique os dados e tente novamente."
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormHeader isEditing={isEditing} />

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
          />
        </div>

        {formData.itens.length > 0 && !showParcelamento && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowParcelamento(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Configurar Parcelamento
            </button>
          </div>
        )}

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
          showParcelamento={showParcelamento}
          onConfirmParcelamento={handleConfirmarParcelamento}
          setShowParcelamento={setShowParcelamento}
          hasItems={formData.itens.length > 0}
        />
      </form>
    </div>
  );
};

export default PedidoForm;
