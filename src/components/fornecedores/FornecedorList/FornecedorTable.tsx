// src/components/fornecedores/FornecedorList/FornecedorTable.tsx
import { Fornecedor } from "../../../types/fornecedores";
import FornecedorRow from "./FornecedorRow";

interface FornecedorTableProps {
  fornecedores: Fornecedor[];
  onRowClick: (cnpj: string) => void;
}

export const FornecedorTable = ({
  fornecedores,
  onRowClick,
}: FornecedorTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {["CNPJ", "Nome", "Nome Fantasia", "Email", "Telefone"].map(
            (header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {fornecedores.map((fornecedor) => (
          <FornecedorRow
            key={fornecedor.cnpj}
            fornecedor={fornecedor}
            onClick={() => onRowClick(fornecedor.cnpj)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default FornecedorTable;
