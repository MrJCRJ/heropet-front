import { FormSelectProps } from "../../types/pedidos";

export const FormSelect = ({
  name,
  label,
  value,
  onChange,
  options,
  disabled = false,
}: FormSelectProps) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
