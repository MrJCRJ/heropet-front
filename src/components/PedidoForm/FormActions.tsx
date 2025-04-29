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
    <div className="flex justify-end gap-4 mt-8">
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          isSubmitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white shadow-sm`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processando...
          </span>
        ) : isEditing ? (
          "Atualizar Pedido"
        ) : (
          "Criar Pedido"
        )}
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancelar
      </button>
    </div>
  );
};

export default FormActions;
