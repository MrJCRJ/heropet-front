import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../api/httpClient";
import LoadingSpinner from "../../components/LoadingSpinner";
import Alert from "../../components/Alert";
import axios from "axios";

interface Cliente {
  cpfOuCnpj: string;
  nome: string;
  telefone: string;
}

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await httpClient.get("/clientes");
        setClientes(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Erro ao carregar clientes");
        } else if (err instanceof Error) {
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

    try {
      await httpClient.delete(`/clientes/${cpfOuCnpj}`);
      // Atualiza a lista após exclusão
      setClientes(
        clientes.filter((cliente) => cliente.cpfOuCnpj !== cpfOuCnpj)
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Erro ao excluir cliente");
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Erro desconhecido ao excluir cliente");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <Link
          to="/clientes/novo"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Cliente
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cliente.cpfOuCnpj}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cliente.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cliente.telefone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    to={`/clientes/${cliente.cpfOuCnpj}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/clientes/${cliente.cpfOuCnpj}/editar`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(cliente.cpfOuCnpj)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
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
