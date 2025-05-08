import { Button } from "../../ui/Button"; // Importe seu componente Button existente

interface SubmitButtonProps {
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

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
