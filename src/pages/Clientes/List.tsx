import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarClientes, excluirCliente, Cliente } from "../../api/clientes";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button"; // Importe o Button
import { formatCPF, formatCNPJ, formatPhone } from "../../utils/masks"; // Importe as funções de formatação

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await listarClientes();
        setClientes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido ao carregar clientes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async (cpfOuCnpj: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) {
      return;
    }

    setDeleting(cpfOuCnpj);
    try {
      await excluirCliente(cpfOuCnpj);
      setClientes(
        clientes.filter((cliente) => cliente.cpfOuCnpj !== cpfOuCnpj)
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Erro desconhecido ao excluir cliente");
      }
    } finally {
      setDeleting(null);
    }
  };

  const formatDocument = (doc: string) => {
    return doc.length <= 11 ? formatCPF(doc) : formatCNPJ(doc);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <Link to="/clientes/novo">
          <Button variant="primary">Novo Cliente</Button>
        </Link>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF/CNPJ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map((cliente) => (
              <tr key={cliente.cpfOuCnpj}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {formatDocument(cliente.cpfOuCnpj)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cliente.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {formatPhone(cliente.telefone || "")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link to={`/clientes/${cliente.cpfOuCnpj}`}>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </Link>
                  <Link to={`/clientes/${cliente.cpfOuCnpj}/editar`}>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(cliente.cpfOuCnpj)}
                    loading={deleting === cliente.cpfOuCnpj}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClienteList;
