import React from "react";
import { StatusFilterProps, PedidoStatus } from "../../types/pedidos";

const status = [
  { valor: PedidoStatus.PAGO, label: "Pagos" },
  { valor: PedidoStatus.PENDENTE, label: "Pendentes" },
  { valor: PedidoStatus.CANCELADO, label: "Cancelados" },
  { valor: PedidoStatus.PROCESSANDO, label: "Processando" },
  { valor: PedidoStatus.ATRASADO, label: "Atrasados" },
];

export const StatusFilter: React.FC<StatusFilterProps> = ({
  show,
  currentFilter,
  onFilterChange,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="absolute mt-2 right-0 z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200">
      <button
        onClick={() => {
          onFilterChange(undefined);
          onClose();
        }}
        className={`block w-full text-left px-3 py-1 text-sm rounded-md font-medium transition-colors ${
          !currentFilter
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Todos
      </button>
      {status.map((stat) => (
        <button
          key={stat.valor}
          onClick={() => {
            onFilterChange(stat.valor);
            onClose();
          }}
          className={`block w-full text-left px-3 py-1 text-sm rounded-md font-medium transition-colors ${
            currentFilter === stat.valor
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {stat.label}
        </button>
      ))}
    </div>
  );
};
