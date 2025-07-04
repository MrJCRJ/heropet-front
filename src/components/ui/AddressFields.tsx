import { useState } from "react";
import { EnderecoViaCep } from "../../types/fornecedores";
import { InputField } from "./InputField";
import { CepField } from "../CepField";

export interface AddressFieldsProps {
  endereco: {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    numero?: string;
    complemento?: string;
  };
  onChange: (name: string, value: string) => void;
  isLoading: boolean;
  errors?: Record<string, string>;
}

export const AddressFields = ({
  endereco,
  onChange,
  isLoading,
  errors,
}: AddressFieldsProps) => {
  const [localAddress, setLocalAddress] = useState<
    Omit<EnderecoViaCep, "complemento" | "numero">
  >({
    cep: endereco.cep || "",
    logradouro: endereco.logradouro || "",
    bairro: endereco.bairro || "",
    localidade: endereco.localidade || "",
    uf: endereco.uf || "",
  });

  const handleAddressFetched = (data: Omit<EnderecoViaCep, "cep">) => {
    setLocalAddress({
      cep: endereco.cep || "",
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    });

    onChange("endereco.logradouro", data.logradouro);
    onChange("endereco.bairro", data.bairro);
    onChange("endereco.localidade", data.localidade);
    onChange("endereco.uf", data.uf);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Endereço</h3>
      <CepField
        field={{
          value: endereco.cep || "",
          onChange: (value: string) => {
            onChange("endereco.cep", value);
            if (value.length < 9) {
              setLocalAddress({
                cep: "",
                logradouro: "",
                bairro: "",
                localidade: "",
                uf: "",
              });
            }
          },
        }}
        disabled={isLoading}
        onAddressFound={handleAddressFetched}
        error={errors?.cep}
      />

      {localAddress.logradouro && (
        <>
          <InputField
            label="Logradouro"
            name="logradouro"
            value={localAddress.logradouro}
            onChange={() => {}}
            disabled
            className="mt-4"
          />

          <InputField
            label="Bairro"
            name="bairro"
            value={localAddress.bairro}
            onChange={() => {}}
            disabled
            className="mt-4"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField
              label="Cidade"
              name="cidade"
              value={localAddress.localidade}
              onChange={() => {}}
              disabled
            />

            <InputField
              label="UF"
              name="uf"
              value={localAddress.uf}
              onChange={() => {}}
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField
              label="Número"
              name="endereco.numero"
              value={endereco.numero || ""}
              onChange={(e) => onChange("endereco.numero", e.target.value)}
              disabled={isLoading}
            />

            <InputField
              label="Complemento"
              name="endereco.complemento"
              value={endereco.complemento || ""}
              onChange={(e) => onChange("endereco.complemento", e.target.value)}
              disabled={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};
