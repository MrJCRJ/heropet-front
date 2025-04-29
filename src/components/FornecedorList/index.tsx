import { Link } from "react-router-dom";
import { type Fornecedor } from "../../api/fornecedores";
import { useState } from "react";

interface FornecedorListProps {
  fornecedores: Fornecedor[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (cnpj: string) => void;
}

const FornecedorList = ({
  fornecedores,
  isLoading = false,
  error = null,
  onDelete,
}: FornecedorListProps) => {
  const [deleting, setDeleting] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="py-4 text-center text-gray-600">
        Carregando fornecedores...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 my-4 text-red-600 bg-red-50 rounded-md border border-red-100">
        {error}
      </div>
    );
  }

  if (fornecedores.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500 italic">
        Nenhum fornecedor cadastrado
      </div>
    );
  }

  const handleDelete = async (cnpj: string) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      setDeleting(cnpj);
      try {
        if (onDelete) {
          await onDelete(cnpj);
        }
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CNPJ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome Fantasia
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
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
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.cnpj} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fornecedor.cnpj}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fornecedor.nome}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fornecedor.nomeFantasia}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fornecedor.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fornecedor.telefone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex gap-2 flex-wrap">
                  <Link
                    to={`/fornecedores/${fornecedor.cnpj}`}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/fornecedores/${fornecedor.cnpj}/editar`}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors"
                  >
                    Editar
                  </Link>
                  {onDelete && (
                    <button
                      onClick={() => handleDelete(fornecedor.cnpj)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        deleting === fornecedor.cnpj
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                      disabled={deleting === fornecedor.cnpj}
                    >
                      {deleting === fornecedor.cnpj ? (
                        <span className="flex items-center gap-1">
                          <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full"></span>
                          Excluindo...
                        </span>
                      ) : (
                        "Excluir"
                      )}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FornecedorList;
