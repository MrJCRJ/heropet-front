interface ParcelamentoButtonProps {
  variant: "config" | "confirm";
  disabled?: boolean;
  onClick?: () => void; // Tornando onClick opcional
}

export const ParcelamentoButton = ({
  variant,
  disabled,
  onClick,
}: ParcelamentoButtonProps) => {
  const config = {
    config: {
      label: "Configurar Parcelamento",
      className: "bg-green-600 hover:bg-green-700",
    },
    confirm: {
      label: "Confirmar Parcelamento",
      className: "bg-blue-600 hover:bg-blue-700",
    },
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !onClick} // Desabilita se não houver onClick
      className={`px-6 py-2 text-white font-medium rounded-md transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${config[variant].className}`}
    >
      {config[variant].label}
    </button>
  );
};
