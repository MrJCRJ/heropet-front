import { Field, useFormikContext } from "formik";
import { InputField } from "./InputField";
import { CepField } from "./CepField";
import { AddressFields } from "./AddressFields";
import { ClienteFormValues } from "../../types/cliente";
import { ClienteFormFieldsProps } from "../../types/cliente";

const ClienteFormFields = ({ isEdit }: ClienteFormFieldsProps) => {
  const { values, setFieldValue } = useFormikContext<ClienteFormValues>();

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("numero", e.target.value);
  };

  const handleComplementoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("complemento", e.target.value);
  };

  return (
    <div className="space-y-4">
      <Field
        name="cpfOuCnpj"
        component={InputField}
        label="CPF/CNPJ"
        placeholder="Digite o CPF (11 dígitos) ou CNPJ (14 dígitos)"
        disabled={isEdit}
      />
      <Field
        name="nome"
        component={InputField}
        label="Nome"
        placeholder="Digite o nome completo"
      />
      <Field
        name="telefone"
        component={InputField}
        label="Telefone"
        placeholder="Digite o telefone"
      />
      <Field
        name="cep"
        component={CepField}
        label="CEP"
        placeholder="Digite o CEP"
      />

      <AddressFields
        address={{
          numero: values.numero || "",
          complemento: values.complemento || "",
        }}
        onComplementoChange={handleComplementoChange}
        onNumeroChange={handleNumeroChange}
        disabled={false}
      />
    </div>
  );
};

export default ClienteFormFields;
