import React, { useEffect, useState } from "react";
import axios from "axios";
import { EnderecoViaCep } from "./types";

interface CepFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  onAddressFetched: (address: EnderecoViaCep) => void;
  error?: string;
}

export const CepField = ({
  value,
  onChange,
  disabled,
  onAddressFetched,
  error,
}: CepFieldProps) => {
  const [lastValidCep, setLastValidCep] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);

  const applyCepMask = (cep: string): string => {
    return cep
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(applyCepMask(e.target.value));
  };

  useEffect(() => {
    const cleanCep = value.replace(/\D/g, "");

    // Só faz a requisição se:
    // 1. O CEP tem 8 dígitos
    // 2. Não é igual ao último CEP válido
    // 3. Não está já fazendo uma requisição
    if (cleanCep.length === 8 && cleanCep !== lastValidCep && !isFetching) {
      const fetchAddress = async (): Promise<void> => {
        setIsFetching(true);
        try {
          const response = await axios.get<EnderecoViaCep & { erro?: boolean }>(
            `https://viacep.com.br/ws/${cleanCep}/json/`
          );

          if (!response.data.erro) {
            setLastValidCep(cleanCep);
            onAddressFetched({
              logradouro: response.data.logradouro,
              bairro: response.data.bairro,
              localidade: response.data.localidade,
              uf: response.data.uf,
            });
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        } finally {
          setIsFetching(false);
        }
      };

      fetchAddress();
    }
  }, [value, lastValidCep, isFetching, onAddressFetched]);

  return (
    <div className="space-y-2">
      <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
        CEP <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="cep"
        name="cep"
        value={value}
        onChange={handleChange}
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
