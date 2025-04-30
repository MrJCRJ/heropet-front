import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarCliente } from "../../api/clientes";
import LoadingSpinner from "../../components/LoadingSpinner";
import Alert from "../../components/Alert";
import DetailCard from "../../components/DetailCard";

interface Cliente {
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
  cep: string;
  numero: string;
  complemento?: string;
}

const ClienteView = () => {
  const { cpfOuCnpj } = useParams<{ cpfOuCnpj: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await buscarCliente(cpfOuCnpj!);
        setCliente(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido ao carregar cliente");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [cpfOuCnpj]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert type="error" message={error} />;
  if (!cliente) return <div>Cliente não encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Detalhes do Cliente
        </h1>
        <Link
          to={`/clientes/${cpfOuCnpj}/editar`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Editar
        </Link>
      </div>

      <DetailCard title="Informações do Cliente">
        <DetailCard.Row label="CPF/CNPJ" value={cliente.cpfOuCnpj} />
        <DetailCard.Row label="Nome" value={cliente.nome} />
        <DetailCard.Row label="Telefone" value={cliente.telefone} />
        <DetailCard.Row label="CEP" value={cliente.cep} />
        <DetailCard.Row label="Número" value={cliente.numero} />
        {cliente.complemento && (
          <DetailCard.Row label="Complemento" value={cliente.complemento} />
        )}
      </DetailCard>
    </div>
  );
};

export default ClienteView;
