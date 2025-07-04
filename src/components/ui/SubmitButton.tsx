import { Button } from "./Button"; // Ajuste o caminho conforme necessário
import { SubmitButtonProps } from "../../types/cliente";

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isEdit,
  className = "",
}) => {
  return (
    <div className={`flex justify-end mt-6 ${className}`}>
      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="px-6 py-2 font-medium"
      >
        {isSubmitting
          ? "Salvando..."
          : isEdit
          ? "Atualizar Cliente"
          : "Cadastrar Cliente"}
      </Button>
    </div>
  );
};
