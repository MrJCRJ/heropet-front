import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { formatCEP } from "../utils/masks";

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export interface CepFieldProps {
  /** Valor atual do CEP (com ou sem máscara) */
  value: string;
  /** Função chamada quando o CEP muda */
  onChange: (cep: string) => void;
  /** Se o campo está desabilitado */
  disabled?: boolean;
  /** Função chamada quando um endereço é encontrado */
  onAddressFound?: (address: Omit<EnderecoViaCep, "cep">) => void;
  /** Função chamada quando ocorre um erro na busca */
  onFetchError?: (error: Error | AxiosError) => void;
  /** Mensagem de erro de validação */
  error?: string;
  /** Label do campo */
  label?: string;
  /** Se o campo é obrigatório */
  required?: boolean;
  /** Classes adicionais para o container */
  className?: string;
  /** Tempo de debounce para a busca do CEP (em ms) */
  debounceTime?: number;
}

/**
 * Componente de campo de CEP com busca automática de endereço
 *
 * @example
 * <CepField
 *   value={cep}
 *   onChange={setCep}
 *   onAddressFound={handleAddressFound}
 *   onFetchError={console.error}
 * />
 */
export const CepField = React.memo(
  ({
    value,
    onChange,
    disabled = false,
    onAddressFound,
    onFetchError,
    error,
    label = "CEP",
    required = true,
    className = "",
    debounceTime = 500,
  }: CepFieldProps) => {
    const [isFetching, setIsFetching] = useState(false);
    const [lastSearchedCep, setLastSearchedCep] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    // Remove a máscara do CEP
    const cleanCep = (cep: string): string => cep.replace(/\D/g, "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const maskedCep = formatCEP(e.target.value);
      onChange(maskedCep);
      setLocalError(null);
    };

    // Busca o endereço com debounce
    useEffect(() => {
      const cepDigits = cleanCep(value);

      if (!onAddressFound || cepDigits.length !== 8) return;

      const timer = setTimeout(async () => {
        if (cepDigits === lastSearchedCep) return;

        setIsFetching(true);
        try {
          const response = await axios.get<EnderecoViaCep>(
            `https://viacep.com.br/ws/${cepDigits}/json/`
          );

          if (response.data.erro) {
            setLocalError("CEP não encontrado");
            onFetchError?.(new Error("CEP não encontrado"));
          } else {
            setLastSearchedCep(cepDigits);
            const { ...address } = response.data;
            onAddressFound(address);
            setLocalError(null);
          }
        } catch (err) {
          const error = err as AxiosError;
          console.error("Erro ao buscar CEP:", error);
          setLocalError("Erro ao buscar CEP");
          onFetchError?.(error);
        } finally {
          setIsFetching(false);
        }
      }, debounceTime);

      return () => clearTimeout(timer);
    }, [value, lastSearchedCep, debounceTime, onAddressFound, onFetchError]);

    const displayError = error || localError;

    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label
            htmlFor="cep"
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}

        <div className="relative">
          <input
            type="text"
            id="cep"
            name="cep"
            value={value}
            onChange={handleChange}
            disabled={disabled || isFetching}
            placeholder="00000-000"
            className={`block w-full px-3 py-2 border ${
              displayError ? "border-red-300" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
            inputMode="numeric"
          />

          {isFetching && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {displayError && (
          <p className="mt-1 text-sm text-red-600">{displayError}</p>
        )}

        {isFetching && !displayError && (
          <p className="mt-1 text-sm text-gray-500">Buscando endereço...</p>
        )}
      </div>
    );
  }
);

CepField.displayName = "CepField";
