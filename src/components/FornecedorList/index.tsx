import { Link } from "react-router-dom";
import { type Fornecedor } from "../../api/fornecedores";
import { useState } from "react";

// Funções de formatação
const formatCNPJ = (cnpj: string) => {
  if (!cnpj) return "";
  // Remove todos os caracteres não numéricos
  const cleaned = cnpj.replace(/\D/g, "");
  // Aplica a máscara: XX.XXX.XXX/XXXX-XX
  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

const formatTelefone = (telefone: string) => {
  if (!telefone) return "";
  // Remove todos os caracteres não numéricos
  const cleaned = telefone.replace(/\D/g, "");

  // Formatação para telefone fixo (10 dígitos) ou celular (11 dígitos)
  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }
  // Retorna sem formatação se não tiver tamanho esperado
  return telefone;
};

interface FornecedorListProps {
  fornecedores: Fornecedor[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (cnpj: string) => Promise<void> | void;
}

const FornecedorList = ({
  fornecedores,
  isLoading = false,
  error = null,
  onDelete,
}: FornecedorListProps) => {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (cnpj: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este fornecedor?"))
      return;

    setDeleting(cnpj);
    try {
      await onDelete?.(cnpj);
    } finally {
      setDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-4 text-center text-gray-600">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-2">Carregando fornecedores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 my-4 text-red-600 bg-red-50 rounded-md border border-red-100">
        <p className="font-medium">Erro ao carregar fornecedores</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (fornecedores.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 italic">Nenhum fornecedor cadastrado</p>
        <Link
          to="/fornecedores/novo"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Cadastrar novo fornecedor
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto mt-6 shadow-sm rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "CNPJ",
              "Nome",
              "Nome Fantasia",
              "Email",
              "Telefone",
              "Ações",
            ].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fornecedores.map((fornecedor) => {
            const isDeleting = deleting === fornecedor.cnpj;
            const cnpjFormatado = formatCNPJ(fornecedor.cnpj);
            const telefoneFormatado = formatTelefone(fornecedor.telefone || "");

            return (
              <tr
                key={fornecedor.cnpj}
                className="hover:bg-gray-50 transition-colors"
                aria-busy={isDeleting}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 font-mono">
                    {cnpjFormatado}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {fornecedor.nome || (
                      <span className="text-gray-400 italic">
                        Não informado
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {fornecedor.nomeFantasia || (
                      <span className="text-gray-400 italic">
                        Não informado
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {fornecedor.email || (
                      <span className="text-gray-400 italic">
                        Não informado
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {telefoneFormatado || (
                      <span className="text-gray-400 italic">
                        Não informado
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link
                      to={`/fornecedores/${fornecedor.cnpj}`}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
                      aria-label={`Ver detalhes de ${
                        fornecedor.nome || fornecedor.cnpj
                      }`}
                    >
                      Ver
                    </Link>

                    <Link
                      to={`/fornecedores/${fornecedor.cnpj}/editar`}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors"
                      aria-label={`Editar ${
                        fornecedor.nome || fornecedor.cnpj
                      }`}
                    >
                      Editar
                    </Link>

                    {onDelete && (
                      <button
                        onClick={() => handleDelete(fornecedor.cnpj)}
                        disabled={isDeleting}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                          isDeleting
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        aria-label={`Excluir ${
                          fornecedor.nome || fornecedor.cnpj
                        }`}
                      >
                        {isDeleting ? (
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FornecedorList;
