import { SubmitButton } from "./SubmitButton";
import { Button } from "../ui/Button";

interface FormActionsProps {
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export const FormActions = ({
  isSubmitting,
  isEditing,
  onCancel,
}: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 mt-8">
      <SubmitButton isSubmitting={isSubmitting} isEditing={isEditing} />

      <Button
        variant="secondary"
        onClick={onCancel}
        disabled={isSubmitting}
        type="button"
      >
        Cancelar
      </Button>
    </div>
  );
};
