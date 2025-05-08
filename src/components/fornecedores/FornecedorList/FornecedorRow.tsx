// src/components/fornecedores/FornecedorList/FornecedorRow.tsx
import { Link } from "react-router-dom";
import { formatCNPJ, formatPhone } from "../../../utils/masks";
import { type Fornecedor } from "../../../api/fornecedores";
import { Button } from "../../ui/Button"; // Importe o componente Button

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
          <Link to={`/fornecedores/${fornecedor.cnpj}`}>
            <Button
              variant="primary"
              size="sm"
              className="text-xs"
              aria-label={`Ver detalhes de ${
                fornecedor.nome || fornecedor.cnpj
              }`}
            >
              Ver
            </Button>
          </Link>

          <Link to={`/fornecedores/${fornecedor.cnpj}/editar`}>
            <Button
              variant="success"
              size="sm"
              className="text-xs"
              aria-label={`Editar ${fornecedor.nome || fornecedor.cnpj}`}
            >
              Editar
            </Button>
          </Link>

          {onDelete && (
            <Button
              onClick={handleDelete}
              variant="danger"
              size="sm"
              loading={isDeleting}
              className="text-xs"
              aria-label={`Excluir ${fornecedor.nome || fornecedor.cnpj}`}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default FornecedorRow;
