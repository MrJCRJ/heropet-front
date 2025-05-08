// src/components/fornecedores/FornecedorList/FornecedorRow.tsx
import { Link } from "react-router-dom";
import { formatCNPJ, formatPhone } from "../../../utils/masks";
import { type Fornecedor } from "../../../api/fornecedores";

interface FornecedorRowProps {
  fornecedor: Fornecedor;
  onDelete?: (cnpj: string) => Promise<void> | void;
  deleting: string | null;
}

const FornecedorRow = ({
  fornecedor,
  onDelete,
  deleting,
}: FornecedorRowProps) => {
  const isDeleting = deleting === fornecedor.cnpj;
  const cnpjFormatado = formatCNPJ(fornecedor.cnpj);
  const telefoneFormatado = formatPhone(fornecedor.telefone || "");

  const handleDelete = () => {
    if (onDelete) {
      onDelete(fornecedor.cnpj);
    }
  };

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
            <span className="text-gray-400 italic">Não informado</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {fornecedor.nomeFantasia || (
            <span className="text-gray-400 italic">Não informado</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {fornecedor.email || (
            <span className="text-gray-400 italic">Não informado</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-mono">
          {telefoneFormatado || (
            <span className="text-gray-400 italic">Não informado</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          <Link
            to={`/fornecedores/${fornecedor.cnpj}`}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
            aria-label={`Ver detalhes de ${fornecedor.nome || fornecedor.cnpj}`}
          >
            Ver
          </Link>

          <Link
            to={`/fornecedores/${fornecedor.cnpj}/editar`}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors"
            aria-label={`Editar ${fornecedor.nome || fornecedor.cnpj}`}
          >
            Editar
          </Link>

          {onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                isDeleting
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              aria-label={`Excluir ${fornecedor.nome || fornecedor.cnpj}`}
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
};

export default FornecedorRow;
