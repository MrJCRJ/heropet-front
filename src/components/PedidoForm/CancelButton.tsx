interface CancelButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
  label: string;
}

export const CancelButton = ({
  isSubmitting,
  onClick,
  label,
}: CancelButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isSubmitting}
    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {label}
  </button>
);
