import { ChangeEventHandler, FocusEventHandler } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "email" | "tel" | "password" | "number";
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  optional?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  mask?: (value: string) => string;
};

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
  optional = false,
  onBlur,
  mask,
}: InputFieldProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = mask ? mask(e.target.value) : e.target.value;
    onChange({ ...e, target: { ...e.target, value: newValue } });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-gray-500 text-xs"> (Opcional)</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
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
