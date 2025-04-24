import { useState } from "react";
import { Pedido, ItemPedido } from "../../api/pedidos";
import styles from "./styles.module.css";

interface FormItemsProps {
  formData: Omit<Pedido, "_id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Pedido, "_id">>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const FormItems = ({ formData, setFormData, setError }: FormItemsProps) => {
  const [novoItem, setNovoItem] = useState<
    Omit<ItemPedido, "total"> & { produto: string }
  >({
    produto: "",
    quantidade: 1,
    precoUnitario: 0.01,
  });

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
      precoUnitario: 0.01,
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

  return (
    <>
      <h3>Itens do Pedido</h3>

      <div className={styles.itemForm}>
        <div className={styles.formGroup}>
          <label>Produto:</label>
          <input
            type="text"
            name="produto"
            value={novoItem.produto}
            onChange={handleItemChange}
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
          />
        </div>

        <button
          type="button"
          onClick={adicionarItem}
          className={styles.addButton}
          disabled={
            !novoItem.produto ||
            novoItem.quantidade <= 0 ||
            novoItem.precoUnitario <= 0
          }
        >
          Adicionar Item
        </button>
      </div>

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
    </>
  );
};

export default FormItems;
