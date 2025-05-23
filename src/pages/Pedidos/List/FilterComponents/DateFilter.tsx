import React from "react";
import { DateFilterProps } from "./types";

export const DateFilter: React.FC<DateFilterProps> = ({
  show,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onApply,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="absolute mt-2 z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200 w-64">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mês
        </label>
        <select
          className="w-full p-2 border rounded"
          value={selectedMonth || ""}
          onChange={(e) => onMonthChange(Number(e.target.value) || undefined)}
        >
          <option value="">Todos</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ano
        </label>
        <select
          className="w-full p-2 border rounded"
          value={selectedYear || ""}
          onChange={(e) => onYearChange(Number(e.target.value) || undefined)}
        >
          <option value="">Todos</option>
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={onApply}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};
