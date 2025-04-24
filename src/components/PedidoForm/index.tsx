import { useState } from "react";
import { Pedido } from "../../api/pedidos";
import FormHeader from "./FormHeader";
import FormBasics from "./FormBasics";
import FormItems from "./FormItems";
import FormActions from "./FormActions";
import styles from "./styles.module.css";

interface PedidoFormProps {
  initialData?: Omit<Pedido, "_id">;
  onSubmit: (pedido: Omit<Pedido, "_id">) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const PedidoForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: PedidoFormProps) => {
  // Helper function to ensure proper date format
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
      // Ensure all dates are properly formatted before submission
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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormHeader isEditing={isEditing} />

        <FormBasics
          formData={formData}
          isEditing={isEditing}
          handleChange={handleChange}
        />

        <FormItems
          formData={formData}
          setFormData={setFormData}
          setError={setError}
        />

        {error && <div className={styles.error}>{error}</div>}

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
