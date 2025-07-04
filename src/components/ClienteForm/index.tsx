import { ClienteFormValues, SafeClienteFormData } from "../../types/cliente";
import { FormFields } from "../ui/FormFields";
import { SubmitButton } from "../ui/SubmitButton";
import { useState, FormEvent } from "react";
import { Alert } from "../ui/Alert";
import { ClienteFormProps } from "../../types/cliente";

const initialFormData: ClienteFormValues = {
  cpfOuCnpj: "",
  nome: "",
  telefone: "",
  endereco: {
    cep: "",
    numero: "",
    complemento: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  },
};

const toSafeFormData = (
  data?: Partial<ClienteFormValues>
): SafeClienteFormData => {
  return {
    ...initialFormData,
    ...data,
    endereco: {
      ...initialFormData.endereco,
      ...data?.endereco,
    },
  };
};

const ClienteForm = ({
  initialData,
  onSubmit,
  isEditing = false,
  isLoading = false,
  error = null,
}: ClienteFormProps) => {
  const [formData, setFormData] = useState<SafeClienteFormData>(
    toSafeFormData(initialData)
  );

  const cleanNumericFields = (value: string): string =>
    value.replace(/\D/g, "");

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      if (name.startsWith("endereco.")) {
        const field = name.split(".")[1] as keyof typeof prev.endereco;
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

    // Criar objeto formatado para envio
    const formValues: ClienteFormValues = {
      cpfOuCnpj: cleanNumericFields(formData.cpfOuCnpj),
      nome: formData.nome,
      telefone: formData.telefone ? cleanNumericFields(formData.telefone) : "",
      endereco: {
        cep: formData.endereco.cep
          ? cleanNumericFields(formData.endereco.cep)
          : "",
        logradouro: formData.endereco.logradouro || "",
        numero: formData.endereco.numero || "",
        complemento: formData.endereco.complemento || "",
        bairro: formData.endereco.bairro || "",
        localidade: formData.endereco.localidade || "",
        uf: formData.endereco.uf || "",
      },
    };

    onSubmit(formValues);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "Editar Cliente" : "Cadastrar Cliente"}
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
          formData={{
            ...formData,
            cpfOuCnpj: formData.cpfOuCnpj,
            cnpj: undefined,
            nomeFantasia: undefined,
          }}
          isLoading={isLoading}
          isEditing={isEditing}
          onChange={handleChange}
          showCnpjField={false}
          showCpfField={true}
        />

        <div className="flex justify-end">
          <SubmitButton isSubmitting={isLoading} isEdit={isEditing} />
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
