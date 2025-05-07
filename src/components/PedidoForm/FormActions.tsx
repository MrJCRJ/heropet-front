import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";
import { ParcelamentoButton } from "./ParcelamentoButton";

interface FormActionsProps {
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
  showParcelamento?: boolean;
  onConfirmParcelamento?: () => void;
  setShowParcelamento?: (value: boolean) => void;
  hasItems?: boolean;
}

export const FormActions = ({
  isSubmitting,
  isEditing,
  onCancel,
  showParcelamento,
  onConfirmParcelamento,
  setShowParcelamento,
  hasItems,
}: FormActionsProps) => {
  const handleCancelClick = showParcelamento
    ? () => setShowParcelamento?.(false)
    : onCancel;

  const cancelLabel = showParcelamento ? "Cancelar Parcelamento" : "Cancelar";

  return (
    <div className="flex justify-end gap-4 mt-8">
      {!showParcelamento && hasItems && (
        <ParcelamentoButton
          variant="config"
          disabled={isSubmitting}
          onClick={() => setShowParcelamento?.(true)}
        />
      )}

      {showParcelamento && (
        <>
          <ParcelamentoButton
            variant="confirm"
            onClick={onConfirmParcelamento}
          />
        </>
      )}

      <SubmitButton isSubmitting={isSubmitting} isEditing={isEditing} />

      <CancelButton
        isSubmitting={isSubmitting}
        onClick={handleCancelClick}
        label={cancelLabel}
      />
    </div>
  );
};
