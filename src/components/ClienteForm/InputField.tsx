import { InputFieldProps } from "../../types/cliente";

export const InputField = ({
  field,
  form,
  label,
  type = "text",
  required = false,
  disabled = false,
  placeholder = "",
  className = "",
  optional = false,
}: InputFieldProps) => {
  const error = form.touched[field.name] && form.errors[field.name];

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-gray-500 text-xs"> (Opcional)</span>}
      </label>
      <input
        type={type}
        id={field.name}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
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
