import React from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  actions?: React.ReactNode;
  className?: string; // Adicionado para estilos personalizados
}

export const Alert = ({
  type,
  message,
  onClose,
  actions,
  className = "",
}: AlertProps) => {
  // Objeto de estilos completo (incluindo dark mode)
  const variants = {
    success:
      "bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:text-green-200",
    error:
      "bg-red-100 border-red-400 text-red-700 dark:bg-red-900 dark:text-red-200",
    warning:
      "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
    info: "bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded ${variants[type]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {actions && <div className="mt-2 flex gap-2">{actions}</div>}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            aria-label="Fechar alerta"
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Adicione isso se estiver usando Storybook ou precisar identificar facilmente no React DevTools
Alert.displayName = "Alert";
