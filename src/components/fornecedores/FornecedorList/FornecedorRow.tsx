// src/components/fornecedores/FornecedorList/FornecedorRow.tsx
import { FornecedorRowProps } from "../../../types/fornecedores";
import { formatCNPJ, formatPhone } from "../../../utils/masks";

const FornecedorRow = ({ fornecedor, onClick }: FornecedorRowProps) => {
  const cnpjFormatado = formatCNPJ(fornecedor.cnpj);
  const telefoneFormatado = formatPhone(fornecedor.telefone || "");

  return (
    <tr
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
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
    </tr>
  );
};

export default FornecedorRow;
