interface SubmitButtonProps {
  isSubmitting: boolean;
  isEditing: boolean;
}

export const SubmitButton = ({
  isSubmitting,
  isEditing,
}: SubmitButtonProps) => (
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
);
