import { Button } from "../../ui/Button"; // Importe seu componente Button existente
import { SubmitButtonProps } from "./types";

export const SubmitButton = ({
  isLoading = false,
  children = "Salvar",
  className = "",
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      variant="success"
      loading={isLoading}
      className={className}
    >
      {isLoading ? "Salvando..." : children}
    </Button>
  );
};
