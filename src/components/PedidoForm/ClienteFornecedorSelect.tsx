import React, { useState, useEffect } from "react";
import { DropdownButton } from "./DropdownButton";
import { LoadingIndicator } from "./LoadingIndicator";
import { SuggestionList } from "./SuggestionList";

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

  const handleSelectItem = (item: { nome?: string; documento: string }) => {
    onSelect(item.nome || "", item.documento);
    setShowSuggestions(false);
    setShowDropdown(false);
  };

  const label = tipo === "COMPRA" ? "Fornecedor" : "Cliente";
  const placeholder = `Digite o nome do ${label.toLowerCase()} ou selecione`;

  return (
    <div className="space-y-1 relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          required
          disabled={disabled}
          placeholder={placeholder}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {!disabled && (
          <>
            <DropdownButton onClick={toggleDropdown} />
            <LoadingIndicator loading={loading} />
          </>
        )}
      </div>

      <SuggestionList
        suggestions={suggestions}
        onSelect={handleSelectItem}
        visible={showSuggestions || showDropdown}
      />
    </div>
  );
};
