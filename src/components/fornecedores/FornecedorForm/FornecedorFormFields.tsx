import { useState } from "react";
import { FornecedorFormData, EnderecoViaCep } from "./types";
import { InputField } from "./InputField";
import { CepField } from "./CepField";
import { formatCNPJ, formatPhone } from "../../../utils/masks";

interface FornecedorFormFieldsProps {
  formData: FornecedorFormData;
  isLoading: boolean;
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
}

export const FornecedorFormFields = ({
  formData,
  isLoading,
  isEditing,
  onChange,
}: FornecedorFormFieldsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [address, setAddress] = useState<
    Omit<EnderecoViaCep, "complemento" | "numero">
  >({
    logradouro: formData.endereco?.logradouro || "",
    bairro: formData.endereco?.bairro || "",
    localidade: formData.endereco?.localidade || "",
    uf: formData.endereco?.uf || "",
  });

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (
      name === "cnpj" &&
      !isEditing &&
      !value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    ) {
      newErrors.cnpj = "CNPJ inválido";
    } else if (
      name === "email" &&
      value && // Só valida se tiver valor
      !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      newErrors.email = "Email inválido";
    } else if (name === "cep" && !value.match(/^\d{5}-\d{3}$/)) {
      newErrors.cep = "CEP inválido";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleChange = (name: string, value: string) => {
    validateField(name, value);
    onChange(name, value);
  };

  const handleAddressFetched = (data: EnderecoViaCep) => {
    setAddress({
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    });
  };

  return (
    <div className="space-y-4">
      {!isEditing && (
        <InputField
          label="CNPJ"
          name="cnpj"
          value={formData.cnpj || ""}
          onChange={(e) => {
            const formattedValue = formatCNPJ(e.target.value);
            handleChange("cnpj", formattedValue);
          }}
          required
          disabled={isLoading}
          error={errors.cnpj}
          placeholder="00.000.000/0000-00"
          onBlur={() => {
            if (
              formData.cnpj &&
              !formData.cnpj.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
            ) {
              setErrors((prev) => ({ ...prev, cnpj: "CNPJ inválido" }));
            }
          }}
        />
      )}

      <InputField
        label="Nome"
        name="nome"
        value={formData.nome || ""}
        onChange={(e) => handleChange("nome", e.target.value)}
        required
        disabled={isLoading}
        error={errors.nome}
      />

      <InputField
        label="Nome Fantasia"
        name="nomeFantasia"
        value={formData.nomeFantasia || ""}
        onChange={(e) => handleChange("nomeFantasia", e.target.value)}
        disabled={isLoading}
      />

      <InputField
        label="Email"
        name="email"
        value={formData.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        disabled={isLoading}
        error={errors.email}
        onBlur={(e) => {
          // Só valida se tiver valor
          if (
            e.target.value &&
            !e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ) {
            setErrors((prev) => ({ ...prev, email: "Email inválido" }));
          } else {
            // Remove o erro se estiver vazio ou válido
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.email;
              return newErrors;
            });
          }
        }}
      />

      <InputField
        label="Telefone"
        name="telefone"
        value={formData.telefone || ""}
        onChange={(e) => {
          const formattedValue = formatPhone(e.target.value);
          handleChange("telefone", formattedValue);
        }}
        disabled={isLoading}
        placeholder="(00) 0000-0000 ou (00) 00000-0000"
      />

      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Endereço</h3>
        <CepField
          value={formData.endereco?.cep || ""}
          onChange={(value) => {
            handleChange("endereco.cep", value);
            // Limpa os campos de endereço quando o CEP muda e não está completo
            if (value.length < 9) {
              setAddress({
                logradouro: "",
                bairro: "",
                localidade: "",
                uf: "",
              });
            }
          }}
          disabled={isLoading}
          onAddressFetched={handleAddressFetched}
          error={errors.cep}
        />

        {address.logradouro && (
          <>
            <InputField
              label="Logradouro"
              name="logradouro"
              value={address.logradouro}
              onChange={() => {}}
              disabled
              className="mt-4"
            />

            <InputField
              label="Bairro"
              name="bairro"
              value={address.bairro}
              onChange={() => {}}
              disabled
              className="mt-4"
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <InputField
                label="Cidade"
                name="cidade"
                value={address.localidade}
                onChange={() => {}}
                disabled
              />

              <InputField
                label="UF"
                name="uf"
                value={address.uf}
                onChange={() => {}}
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <InputField
                label="Número"
                name="endereco.numero"
                value={formData.endereco?.numero || ""}
                onChange={(e) =>
                  handleChange("endereco.numero", e.target.value)
                }
                disabled={isLoading}
              />

              <InputField
                label="Complemento"
                name="endereco.complemento"
                value={formData.endereco?.complemento || ""}
                onChange={(e) =>
                  handleChange("endereco.complemento", e.target.value)
                }
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
