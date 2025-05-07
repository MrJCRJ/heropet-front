import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ClienteFormValues } from "./types";
import ClienteFormFields from "./ClienteFormFields";
import { SubmitButton } from "./SubmitButton";
import axios from "axios";
import httpClient from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "../ui/Alert";
import { ClienteFormProps } from "./types";

const ClienteForm = ({ initialValues, isEdit = false }: ClienteFormProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    cpfOuCnpj: Yup.string()
      .required("CPF/CNPJ é obrigatório")
      .matches(
        /^\d{11}$|^\d{14}$/,
        "CPF deve ter 11 dígitos ou CNPJ 14 dígitos (apenas números)"
      ),
    nome: Yup.string(),
    telefone: Yup.string(),
    cep: Yup.string().matches(
      /^\d{5}-?\d{3}$/,
      "CEP deve estar no formato 00000-000"
    ),
    logradouro: Yup.string(),
    bairro: Yup.string(),
    cidade: Yup.string(),
    estado: Yup.string(),
    numero: Yup.string(),
    complemento: Yup.string(),
  });

  const defaultInitialValues: ClienteFormValues = {
    cpfOuCnpj: "",
    nome: "",
    telefone: "",
    cep: "",
    numero: "",
    complemento: "",
  };

  const handleSubmit = async (
    values: ClienteFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setError(null);

      if (isEdit) {
        await httpClient.put(`/clientes/${values.cpfOuCnpj}`, values);
      } else {
        await httpClient.post("/clientes", values);
      }

      navigate("/clientes");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setError(
          `Erro ao ${isEdit ? "atualizar" : "cadastrar"} cliente: ${message}`
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? "Editar Cliente" : "Novo Cliente"}
      </h2>

      {error && <Alert type="error" message={error} />}

      <Formik
        initialValues={initialValues || defaultInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validate={() => ({})}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <ClienteFormFields isEdit={isEdit} />
            <SubmitButton isSubmitting={isSubmitting} isEdit={isEdit} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClienteForm;
