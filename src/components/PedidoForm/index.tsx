import { useState } from "react";
import { Pedido, ItemPedido } from "../../api/pedidos";
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
  const [formData, setFormData] = useState<Omit<Pedido, "_id">>(
    initialData || {
      tipo: "VENDA",
      status: "PENDENTE",
      documentoClienteFornecedor: "",
      nomeClienteFornecedor: "",
      dataPedido: new Date().toISOString().split("T")[0],
      itens: [],
      totalPedido: 0,
      temNotaFiscal: false,
      observacoes: "",
    }
  );

  const [novoItem, setNovoItem] = useState<
    Omit<ItemPedido, "total"> & { produto: string }
  >({
    produto: "",
    quantidade: 1,
    precoUnitario: 0,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoItem({
      ...novoItem,
      [name]:
        name === "quantidade" || name === "precoUnitario"
          ? parseFloat(value)
          : value,
    });
  };

  const adicionarItem = () => {
    if (
      !novoItem.produto ||
      novoItem.quantidade <= 0 ||
      novoItem.precoUnitario <= 0
    ) {
      setError("Preencha todos os campos do item corretamente");
      return;
    }

    const itemComTotal: ItemPedido = {
      ...novoItem,
      total: novoItem.quantidade * novoItem.precoUnitario,
    };

    setFormData({
      ...formData,
      itens: [...formData.itens, itemComTotal],
      totalPedido: formData.totalPedido + itemComTotal.total,
    });

    setNovoItem({
      produto: "",
      quantidade: 1,
      precoUnitario: 0,
    });
    setError("");
  };

  const removerItem = (index: number) => {
    const itemRemovido = formData.itens[index];
    setFormData({
      ...formData,
      itens: formData.itens.filter((_, i) => i !== index),
      totalPedido: formData.totalPedido - itemRemovido.total,
    });
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
      await onSubmit(formData);
    } catch (err) {
      setError(
        "Erro ao processar pedido. Verifique os dados e tente novamente."
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
            value={formData.dataPedido}
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
              value={formData.dataEntrega || ""}
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

        <h3>Itens do Pedido</h3>

        <div className={styles.itemForm}>
          <div className={styles.formGroup}>
            <label>Produto:</label>
            <input
              type="text"
              name="produto"
              value={novoItem.produto}
              onChange={handleItemChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Quantidade:</label>
            <input
              type="number"
              name="quantidade"
              value={novoItem.quantidade}
              onChange={handleItemChange}
              min="1"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Preço Unitário:</label>
            <input
              type="number"
              name="precoUnitario"
              value={novoItem.precoUnitario}
              onChange={handleItemChange}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <button
            type="button"
            onClick={adicionarItem}
            className={styles.addButton}
          >
            Adicionar Item
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {formData.itens.length > 0 && (
          <div className={styles.itensList}>
            <h4>Itens Adicionados</h4>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço Unitário</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {formData.itens.map((item, index) => (
                  <tr key={index}>
                    <td>{item.produto}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {item.precoUnitario.toFixed(2)}</td>
                    <td>R$ {item.total.toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removerItem(index)}
                        className={styles.removeButton}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.total}>
              <strong>
                Total do Pedido: R$ {formData.totalPedido.toFixed(2)}
              </strong>
            </div>
          </div>
        )}

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Processando..."
              : isEditing
              ? "Atualizar Pedido"
              : "Criar Pedido"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PedidoForm;
