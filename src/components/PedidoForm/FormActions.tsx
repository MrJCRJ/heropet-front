import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

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

      <CancelButton
        isSubmitting={isSubmitting}
        onClick={onCancel}
        label="Cancelar"
      />
    </div>
  );
};
