import React from "react";
import { DateFilterProps } from "../../types/pedidos";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: new Date(0, i).toLocaleString("default", { month: "long" }),
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => ({
  value: currentYear - i,
  label: (currentYear - i).toString(),
}));

export const DateFilter: React.FC<DateFilterProps> = ({
  show,
  selectedMonth,
  selectedYear,
  onFilterChange,
  onClose,
}) => {
  if (!show) return null;

  const handleMonthChange = (month?: number) => {
    onFilterChange(month, selectedYear);
  };

  const handleYearChange = (year?: number) => {
    onFilterChange(selectedMonth, year);
  };

  const handleReset = () => {
    onFilterChange(undefined, undefined);
  };

  return (
    <div className="absolute mt-2 z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200 w-64">
      <button
        onClick={() => {
          handleReset();
          onClose();
        }}
        className={`block w-full text-left px-3 py-1 text-sm rounded-md font-medium transition-colors mb-2 ${
          !selectedMonth && !selectedYear
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Todos
      </button>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mês
        </label>
        <select
          className="w-full p-2 border rounded"
          value={selectedMonth || ""}
          onChange={(e) => {
            const month = Number(e.target.value) || undefined;
            handleMonthChange(month);
          }}
        >
          <option value="">Selecione</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ano
        </label>
        <select
          className="w-full p-2 border rounded"
          value={selectedYear || ""}
          onChange={(e) => {
            const year = Number(e.target.value) || undefined;
            handleYearChange(year);
          }}
        >
          <option value="">Selecione</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
