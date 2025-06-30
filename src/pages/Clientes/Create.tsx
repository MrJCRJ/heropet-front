import { useNavigate } from "react-router-dom";
import ClienteForm from "../../components/ClienteForm";
import { criarCliente } from "../../api/clientes";
import { Alert } from "../../components/ui/Alert";
import { useState } from "react";
import { ClienteFormValues } from "../../types/cliente";

const ClienteCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: ClienteFormValues) => {
    try {
      await criarCliente(values);
      navigate("/clientes");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao criar cliente");
      }
    }
  };

  return (
    <div>
      {error && <Alert type="error" message={error} />}
      <ClienteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ClienteCreate;
