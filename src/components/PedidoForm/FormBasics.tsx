import { Pedido } from "../../api/pedidos";
import styles from "./styles.module.css";

interface FormBasicsProps {
  formData: Omit<Pedido, "_id">;
  isEditing: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const FormBasics = ({ formData, isEditing, handleChange }: FormBasicsProps) => {
  // Helper function to convert ISO date to yyyy-MM-dd format
  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <div className={styles.formGroup}>
        <label>Tipo de Pedido:</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={styles.select}
          disabled={isEditing}
        >
          <option value="VENDA">Venda</option>
          <option value="COMPRA">Compra</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Documento (CPF/CNPJ):</label>
        <input
          type="text"
          name="documentoClienteFornecedor"
          value={formData.documentoClienteFornecedor}
          onChange={handleChange}
          required
          disabled={isEditing}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Nome:</label>
        <input
          type="text"
          name="nomeClienteFornecedor"
          value={formData.nomeClienteFornecedor}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Data do Pedido:</label>
        <input
          type="date"
          name="dataPedido"
          value={formatDateForInput(formData.dataPedido)}
          onChange={handleChange}
          required
        />
      </div>

      {formData.tipo === "VENDA" && (
        <div className={styles.formGroup}>
          <label>Data de Entrega:</label>
          <input
            type="date"
            name="dataEntrega"
            value={formatDateForInput(formData.dataEntrega)}
            onChange={handleChange}
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label>
          <input
            type="checkbox"
            name="temNotaFiscal"
            checked={formData.temNotaFiscal}
            onChange={handleChange}
          />
          Tem Nota Fiscal?
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>Observações:</label>
        <textarea
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          rows={3}
        />
      </div>
    </>
  );
};

export default FormBasics;
