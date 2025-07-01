import { FormErrorProps } from "../../types/cliente";

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-200 rounded-md">
      {error}
    </div>
  );
};
