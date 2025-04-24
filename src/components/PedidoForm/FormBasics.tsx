import { useState, useEffect } from "react";
import { Pedido } from "../../api/pedidos";
import { listarFornecedores, Fornecedor } from "../../api/fornecedores";
import styles from "./styles.module.css";

interface FormBasicsProps {
  formData: Omit<Pedido, "_id">;
  isEditing: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
}

const FormBasics = ({
  formData,
  isEditing,
  handleChange,
  setFormData,
}: FormBasicsProps) => {
  const [fornecedoresCadastrados, setFornecedoresCadastrados] = useState<
    Fornecedor[]
  >([]);
  const [suggestions, setSuggestions] = useState<Fornecedor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Carrega os fornecedores cadastrados
  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        const response = await listarFornecedores();
        setFornecedoresCadastrados(response.data);
      } catch (err) {
        console.error("Erro ao carregar fornecedores:", err);
      }
    };

    if (!isEditing) {
      carregarFornecedores();
    }
  }, [isEditing]);

  // Atualiza as sugestões quando o documento muda
  useEffect(() => {
    if (formData.documentoClienteFornecedor && !isEditing) {
      const filtered = fornecedoresCadastrados.filter((fornecedor) =>
        fornecedor.cnpj.includes(formData.documentoClienteFornecedor)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.documentoClienteFornecedor, fornecedoresCadastrados, isEditing]);

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setShowSuggestions(true);
  };

  const selectSuggestion = (fornecedor: Fornecedor) => {
    setFormData((prev) => ({
      ...prev,
      documentoClienteFornecedor: fornecedor.cnpj,
      nomeClienteFornecedor: fornecedor.nome || "",
    }));
    setShowSuggestions(false);
  };

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
        <label>Documento (CNPJ):</label>
        <div className={styles.documentoContainer}>
          <input
            type="text"
            name="documentoClienteFornecedor"
            value={formData.documentoClienteFornecedor}
            onChange={handleDocumentoChange}
            required
            disabled={isEditing}
            placeholder="Digite o CNPJ ou selecione um fornecedor"
          />
          {showSuggestions && (
            <ul className={styles.suggestionsList}>
              {suggestions.map((fornecedor, index) => (
                <li
                  key={index}
                  onClick={() => selectSuggestion(fornecedor)}
                  className={styles.suggestionItem}
                >
                  <span className={styles.cnpj}>{fornecedor.cnpj}</span>
                  {fornecedor.nome && (
                    <span className={styles.nome}> - {fornecedor.nome}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
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
