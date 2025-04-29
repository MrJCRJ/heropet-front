import { useState } from "react";
import { Pedido } from "../../api/pedidos";
import FormHeader from "./FormHeader";
import FormBasics from "./FormBasics";
import FormItems from "./FormItems";
import FormActions from "./FormActions";
import Alert from "../../components/Alert";

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
  const normalizeDate = (dateString?: string) => {
    if (!dateString) return new Date().toISOString().split("T")[0];
    return new Date(dateString).toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState<Omit<Pedido, "_id">>(
    initialData || {
      tipo: "VENDA",
      status: "PENDENTE",
      documentoClienteFornecedor: "",
      nomeClienteFornecedor: "",
      dataPedido: normalizeDate(),
      itens: [],
      totalPedido: 0,
      temNotaFiscal: false,
      observacoes: "",
    }
  );

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        dataPedido: normalizeDate(formData.dataPedido),
        dataEntrega: formData.dataEntrega
          ? normalizeDate(formData.dataEntrega)
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

        {error && (
          <div className="mt-4">
            <Alert type="error" message={error} />
          </div>
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
