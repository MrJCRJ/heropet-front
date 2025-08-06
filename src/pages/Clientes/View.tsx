import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { buscarCliente, excluirCliente } from "../../api/clientes";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";
import { DetailCard } from "../../components/ui/DetailCard";
import { Button } from "../../components/ui/Button";
import { formatCPF, formatCNPJ, formatPhone } from "../../utils/masks";

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
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) {
      return;
    }

    setDeleting(true);
    try {
      await excluirCliente(cpfOuCnpj!);
      navigate("/clientes", {
        state: { message: "Cliente excluído com sucesso" },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao excluir cliente");
      }
    } finally {
      setDeleting(false);
    }
  };

  const formatDocument = (doc: string) => {
    return doc.length <= 11 ? formatCPF(doc) : formatCNPJ(doc);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert type="error" message={error} />;
  if (!cliente) return <div>Cliente não encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate("/clientes")}
          className="mr-4"
        >
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 flex-grow text-center">
          Detalhes do Cliente
        </h1>
        <div className="flex gap-2">
          <Link to={`/clientes/${cpfOuCnpj}/editar`}>
            <Button variant="primary">Editar</Button>
          </Link>
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={deleting}
            disabled={deleting}
          >
            Excluir
          </Button>
        </div>
      </div>

      <DetailCard title="Informações do Cliente">
        <DetailCard.Row
          label="CPF/CNPJ"
          value={formatDocument(cliente.cpfOuCnpj)}
        />
        <DetailCard.Row label="Nome" value={cliente.nome} />
        <DetailCard.Row
          label="Telefone"
          value={formatPhone(cliente.telefone || "")}
        />
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
