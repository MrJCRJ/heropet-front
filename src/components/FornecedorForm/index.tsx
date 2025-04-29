import { FormEvent, useState } from "react";
import { FornecedorFormProps, FornecedorFormData } from "./types";
import { FornecedorFormFields } from "./FornecedorFormFields";
import { SubmitButton } from "./SubmitButton";
import { FormError } from "./FormError";

const FornecedorForm = ({
  initialData = {
    cnpj: "",
    nome: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    endereco: {
      cep: "",
      numero: "",
    },
  },
  onSubmit,
  isEditing = false,
  isLoading = false,
  error = null,
}: FornecedorFormProps) => {
  const [formData, setFormData] = useState<FornecedorFormData>(initialData);

  // Função para limpar os dados antes do envio com tratamento para undefined
  const cleanData = (data: FornecedorFormData): FornecedorFormData => {
    return {
      ...data,
      cnpj: data.cnpj.replace(/\D/g, ""),
      telefone: data.telefone?.replace(/\D/g, "") || "", // Trata telefone opcional
      endereco: {
        cep: data.endereco?.cep?.replace(/\D/g, "") || "", // Trata endereco opcional
        numero: data.endereco?.numero || "",
        complemento: data.endereco?.complemento || "",
        // Adicione outros campos do endereço conforme necessário
      },
    };
  };

  const handleChange = (name: string, value: string) => {
    if (name.includes("endereco.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        endereco: {
          ...(formData.endereco || {}), // Garante que endereco existe
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedData = cleanData(formData);
    console.log("Dados limpos para envio:", cleanedData);
    onSubmit(cleanedData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "Editar Fornecedor" : "Novo Fornecedor"}
      </h2>

      <FormError error={error} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <FornecedorFormFields
          formData={formData}
          isLoading={isLoading}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <div className="flex justify-end space-x-3">
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default FornecedorForm;
