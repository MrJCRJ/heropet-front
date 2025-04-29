interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
  actions?: React.ReactNode;
}

const Alert = ({ type, message, onClose, actions }: AlertProps) => {
  const colors = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  return (
    <div className={`border-l-4 p-4 ${colors[type]} rounded`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {actions && <div className="mt-2">{actions}</div>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
