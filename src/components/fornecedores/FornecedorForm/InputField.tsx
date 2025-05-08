import { InputFieldProps } from "./types";

export const InputField = ({
  label,
  name,
  value = "",
  onChange,
  type = "text",
  required = false,
  disabled = false,
  error = "",
  placeholder = "",
  className = "",
  onBlur, // Adicione esta linha
}: InputFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Adicione esta linha
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={`block w-full px-3 py-2 border ${
          error ? "border-red-300" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
