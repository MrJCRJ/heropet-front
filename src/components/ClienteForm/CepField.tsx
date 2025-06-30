import React, { useEffect, useState } from "react";
import { FieldProps } from "formik";
import axios from "axios";
import { EnderecoViaCep } from "../../types/fornecedores"; // Ajuste o caminho conforme necessário

interface CepFieldProps extends FieldProps {
  label: string;
  disabled?: boolean;
}

export const CepField: React.FC<CepFieldProps> = ({
  field,
  form,
  label,
  disabled = false,
}) => {
  const [lastValidCep, setLastValidCep] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyCepMask = (cep: string): string => {
    return cep
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const maskedValue = applyCepMask(e.target.value);
    form.setFieldValue(field.name, maskedValue);
  };

  useEffect(() => {
    const cleanCep = field.value?.replace(/\D/g, "") || "";

    if (cleanCep.length === 8 && cleanCep !== lastValidCep && !isFetching) {
      const fetchAddress = async (): Promise<void> => {
        setIsFetching(true);
        setError(null);
        try {
          const response = await axios.get<EnderecoViaCep & { erro?: boolean }>(
            `https://viacep.com.br/ws/${cleanCep}/json/`
          );

          if (response.data.erro) {
            setError("CEP não encontrado");
          } else {
            setLastValidCep(cleanCep);
            form.setFieldValue("logradouro", response.data.logradouro);
            form.setFieldValue("bairro", response.data.bairro);
            form.setFieldValue("localidade", response.data.localidade); // Alterado de 'cidade'
            form.setFieldValue("uf", response.data.uf); // Alterado de 'estado'
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          setError("Erro ao buscar CEP");
        } finally {
          setIsFetching(false);
        }
      };

      fetchAddress();
    }
  }, [field.value, lastValidCep, isFetching, form, field.name]);

  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id={field.name}
        name={field.name}
        value={field.value || ""}
        onChange={handleChange}
        onBlur={field.onBlur}
        disabled={disabled}
        placeholder="00000-000"
        className={`block w-full px-3 py-2 border ${
          error ? "border-red-300" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {isFetching && (
        <p className="mt-1 text-sm text-gray-500">Buscando endereço...</p>
      )}
    </div>
  );
};
