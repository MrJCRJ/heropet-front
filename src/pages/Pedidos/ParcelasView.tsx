import { Parcela } from "./types";
import { formatarData, formatarMoeda } from "./pedidoUtils";

interface ParcelasViewProps {
  parcelas: Parcela[];
  onTogglePago: (numero: number) => void;
  onRemoveTodasParcelas?: () => void; // Nova prop para remover todas
  isEditing?: boolean;
}

export const ParcelasView = ({
  parcelas,
  onTogglePago,
  onRemoveTodasParcelas,
  isEditing = false,
}: ParcelasViewProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Parcelas</h3>
        {isEditing && onRemoveTodasParcelas && (
          <button
            onClick={onRemoveTodasParcelas}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
          >
            Remover Todas
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcela
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vencimento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parcelas.map((parcela) => (
              <tr key={parcela.numero}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parcela.numero}x
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatarData(parcela.dataVencimento)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatarMoeda(parcela.valor)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTogglePago(parcela.numero)}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          parcela.pago
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {parcela.pago ? "Pago" : "Pendente"}
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        parcela.pago
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {parcela.pago ? "Pago" : "Pendente"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
