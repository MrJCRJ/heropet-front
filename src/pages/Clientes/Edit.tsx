import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarCliente, atualizarCliente } from "../../api/clientes";
import ClienteForm from "../../components/ClienteForm";
import type { ClienteFormValues } from "../../types/cliente";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";

const ClienteEdit = () => {
  const { cpfOuCnpj } = useParams<{ cpfOuCnpj: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<ClienteFormValues | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const cliente = await buscarCliente(cpfOuCnpj!);
        setInitialValues(cliente);
      } catch (err: unknown) {
        if (err instanceof Error) {
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

  const handleSubmit = async (values: ClienteFormValues) => {
    try {
      await atualizarCliente(cpfOuCnpj!, values);
      navigate(`/clientes/${cpfOuCnpj}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao atualizar cliente");
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert type="error" message={error} />;
  if (!initialValues) return <div>Cliente não encontrado</div>;

  return (
    <div>
      {error && <Alert type="error" message={error} />}
      <ClienteForm
        initialData={initialValues}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
};

export default ClienteEdit;
