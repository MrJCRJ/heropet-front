import styles from "./styles.module.css";

interface FormActionsProps {
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const FormActions = ({
  isSubmitting,
  isEditing,
  onCancel,
}: FormActionsProps) => {
  return (
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
  );
};

export default FormActions;
