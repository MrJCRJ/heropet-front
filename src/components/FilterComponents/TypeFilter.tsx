import React from "react";
import { TypeFilterProps } from "../../types/pedidos";

const tipos = [
  { valor: "TODOS", label: "Todos" },
  { valor: "VENDA", label: "Vendas" },
  { valor: "COMPRA", label: "Compras" },
] as const;

export const TypeFilter: React.FC<TypeFilterProps> = ({
  show,
  currentFilter,
  onFilterChange,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="absolute mt-2 z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200">
      {tipos.map((tipo) => (
        <button
          key={tipo.valor}
          onClick={() => {
            onFilterChange(tipo.valor);
            onClose();
          }}
          className={`block w-full text-left px-3 py-1 text-sm rounded-md font-medium transition-colors ${
            (tipo.valor === "TODOS" && !currentFilter) ||
            currentFilter === tipo.valor
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tipo.label}
        </button>
      ))}
    </div>
  );
};
