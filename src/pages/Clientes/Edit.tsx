import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpClient from "../../api/httpClient";
import ClienteForm from "../../components/ClienteForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import Alert from "../../components/Alert";
import { ClienteFormValues } from "../../components/ClienteForm/types";
import axios from "axios";

const ClienteEdit = () => {
  const { cpfOuCnpj } = useParams<{ cpfOuCnpj: string }>();
  const [initialValues, setInitialValues] = useState<ClienteFormValues | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await httpClient.get(`/clientes/${cpfOuCnpj}`);
        setInitialValues(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Erro ao carregar cliente");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao carregar cliente");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [cpfOuCnpj]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert type="error" message={error} />;
  if (!initialValues) return <div>Cliente não encontrado</div>;

  return <ClienteForm initialValues={initialValues} isEdit />;
};

export default ClienteEdit;
