import { FormEvent, useState } from "react";
import {
  FornecedorFormProps,
  FornecedorFormData,
  SafeFornecedorFormData,
  Endereco,
} from "../../types/fornecedores";
import { FormFields } from "../ui/FormFields";
import { SubmitButton } from "../ui/SubmitButton";
import { Alert } from "../ui/Alert";

const initialFormData: SafeFornecedorFormData = {
  cnpj: "",
  nome: "",
  nomeFantasia: "",
  email: "",
  telefone: "",
  endereco: {
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
  },
};

// Função para converter dados opcionais para o tipo seguro
const toSafeFormData = (
  data?: Partial<FornecedorFormData>
): SafeFornecedorFormData => {
  return {
    ...initialFormData,
    ...data,
    endereco: {
      ...initialFormData.endereco,
      ...data?.endereco,
    },
  };
};

export const FornecedorForm = ({
  initialData,
  onSubmit,
  isEditing = false,
  isLoading = false,
  error = null,
}: FornecedorFormProps) => {
  const [formData, setFormData] = useState<SafeFornecedorFormData>(
    toSafeFormData(initialData)
  );

  const cleanNumericFields = (value: string): string =>
    value.replace(/\D/g, "");

  const normalizeFormData = (
    data: SafeFornecedorFormData
  ): FornecedorFormData => {
    return {
      cnpj: cleanNumericFields(data.cnpj),
      nome: data.nome,
      nomeFantasia: data.nomeFantasia,
      email: data.email,
      telefone: data.telefone ? cleanNumericFields(data.telefone) : undefined,
      endereco: {
        cep: data.endereco.cep
          ? cleanNumericFields(data.endereco.cep)
          : undefined,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        complemento: data.endereco.complemento,
        bairro: data.endereco.bairro,
        localidade: data.endereco.localidade,
        uf: data.endereco.uf,
      },
    };
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      if (name.startsWith("endereco.")) {
        const field = name.split(".")[1] as keyof Endereco;
        return {
          ...prev,
          endereco: {
            ...prev.endereco,
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(normalizeFormData(formData));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "Editar Fornecedor" : "Cadastrar Fornecedor"}
      </h2>

      {error && (
        <Alert
          type="error"
          message={
            typeof error === "string"
              ? error
              : "Ocorreu um erro ao processar o formulário"
          }
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormFields
          formData={formData}
          isLoading={isLoading}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <SubmitButton isSubmitting={isLoading} isEdit={isEditing} />
        </div>
      </form>
    </div>
  );
};

export default FornecedorForm;
