import { useState } from "react";
import { InputField } from "./InputField";
import { formatCPF, formatCNPJ, formatPhone } from "../../utils/masks"; // Adicione formatCPF
import { AddressFields } from "./AddressFields";

export interface FormFieldsProps {
  formData: {
    cpfOuCnpj?: string; // Adicionado campo para CPF/CNPJ
    cnpj?: string;
    nome?: string;
    nomeFantasia?: string;
    email?: string;
    telefone?: string;
    endereco?: {
      cep?: string;
      logradouro?: string;
      bairro?: string;
      localidade?: string;
      uf?: string;
      numero?: string;
      complemento?: string;
    };
  };
  isLoading: boolean;
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
  showCnpjField?: boolean;
  showCpfField?: boolean; // Nova prop para controlar campo CPF
}

export const FormFields = ({
  formData,
  isLoading,
  isEditing,
  onChange,
  showCnpjField = true,
  showCpfField = true, // Valor padrão true
}: FormFieldsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === "cpfOuCnpj" && showCpfField && !isEditing) {
      const cleanedValue = value.replace(/\D/g, "");
      const isCpf = cleanedValue.length <= 11;

      if (isCpf && !value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
        newErrors.cpfOuCnpj = "CPF inválido";
      } else if (!isCpf && !value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)) {
        newErrors.cpfOuCnpj = "CNPJ inválido";
      } else {
        delete newErrors.cpfOuCnpj;
      }
    } else if (
      name === "cnpj" &&
      !isEditing &&
      !value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    ) {
      newErrors.cnpj = "CNPJ inválido";
    } else if (
      name === "email" &&
      value &&
      !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      newErrors.email = "Email inválido";
    } else if (name === "endereco.cep" && !value.match(/^\d{5}-\d{3}$/)) {
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

  return (
    <div className="space-y-4">
      {/* Campo CPF/CNPJ para clientes */}
      {showCpfField && !isEditing && (
        <InputField
          label="CPF/CNPJ"
          name="cpfOuCnpj"
          value={formData.cpfOuCnpj || ""}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/\D/g, "");
            let formattedValue = e.target.value;

            if (rawValue.length <= 11) {
              formattedValue = formatCPF(rawValue);
            } else {
              formattedValue = formatCNPJ(rawValue);
            }

            handleChange("cpfOuCnpj", formattedValue);
          }}
          required
          disabled={isLoading}
          error={errors.cpfOuCnpj}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          onBlur={() => {
            if (formData.cpfOuCnpj) {
              const cleanedValue = formData.cpfOuCnpj.replace(/\D/g, "");
              const isCpf = cleanedValue.length <= 11;

              if (
                isCpf &&
                !formData.cpfOuCnpj.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
              ) {
                setErrors((prev) => ({ ...prev, cpfOuCnpj: "CPF inválido" }));
              } else if (
                !isCpf &&
                !formData.cpfOuCnpj.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
              ) {
                setErrors((prev) => ({ ...prev, cpfOuCnpj: "CNPJ inválido" }));
              }
            }
          }}
        />
      )}

      {/* Campo CNPJ para fornecedores */}
      {showCnpjField && !isEditing && (
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

      {formData.nomeFantasia !== undefined && (
        <InputField
          label="Nome Fantasia"
          name="nomeFantasia"
          value={formData.nomeFantasia || ""}
          onChange={(e) => handleChange("nomeFantasia", e.target.value)}
          disabled={isLoading}
        />
      )}

      <InputField
        label="Email"
        name="email"
        value={formData.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        disabled={isLoading}
        error={errors.email}
        onBlur={(e) => {
          if (
            e.target.value &&
            !e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ) {
            setErrors((prev) => ({ ...prev, email: "Email inválido" }));
          } else {
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

      {formData.endereco && (
        <AddressFields
          endereco={formData.endereco}
          onChange={onChange}
          isLoading={isLoading}
          errors={errors}
        />
      )}
    </div>
  );
};
