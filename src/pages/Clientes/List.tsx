import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarClientes, Cliente } from "../../api/clientes";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { formatCPF, formatCNPJ, formatPhone } from "../../utils/masks";

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const formatDocument = (doc: string) => {
    return doc.length <= 11 ? formatCPF(doc) : formatCNPJ(doc);
  };

  if (loading && clientes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Carregando lista de cliente...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr
                  key={cliente.cpfOuCnpj}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/clientes/${cliente.cpfOuCnpj}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {formatDocument(cliente.cpfOuCnpj)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cliente.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {formatPhone(cliente.telefone || "")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {clientes ? "Nenhum cliente encontrado" : "Carregando..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClienteList;
