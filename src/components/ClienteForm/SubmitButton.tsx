interface SubmitButtonProps {
  isSubmitting: boolean;
  isEdit: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isEdit,
}) => {
  return (
    <div className="flex justify-end mt-6">
      <button
        type="submit" // Isso é crucial
        disabled={isSubmitting}
        className={`px-6 py-2 rounded-md text-white font-medium ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 transition-colors"
        }`}
      >
        {isSubmitting
          ? "Salvando..."
          : isEdit
          ? "Atualizar Cliente"
          : "Cadastrar Cliente"}
      </button>
    </div>
  );
};
