import { useState, useEffect } from "react";
import { formatDocumento } from "./utils";

interface ClienteFornecedorSelectProps {
  tipo: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (nome: string, documento: string) => void;
  disabled?: boolean;
  items: Array<{ nome?: string; documento: string }>;
  loading?: boolean;
}

export const ClienteFornecedorSelect = ({
  tipo,
  value,
  onChange,
  onSelect,
  disabled,
  items,
  loading,
}: ClienteFornecedorSelectProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(items);

  useEffect(() => {
    // Log para verificar os itens recebidos
    setSuggestions(items);
  }, [items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setShowDropdown(!showDropdown);
      setShowSuggestions(false);
    }
  };

  const selectItem = (item: { nome?: string; documento: string }) => {
    onSelect(item.nome || "", item.documento);
    setShowSuggestions(false);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-1 relative">
      <label className="block text-sm font-medium text-gray-700">
        {tipo === "COMPRA" ? "Fornecedor" : "Cliente"}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          required
          disabled={disabled}
          placeholder={`Digite o nome do ${
            tipo === "COMPRA" ? "fornecedor" : "cliente"
          } ou selecione`}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
        {!disabled && (
          <button
            type="button"
            onClick={toggleDropdown}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        {loading && !disabled && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-10">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {(showSuggestions || showDropdown) && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto border border-gray-200">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => selectItem(item)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer flex flex-col"
            >
              <span className="font-medium">{item.nome}</span>
              <span className="text-gray-500 truncate">
                {formatDocumento(item.documento)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
