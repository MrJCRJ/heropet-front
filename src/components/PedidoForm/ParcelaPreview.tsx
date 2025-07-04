import { ParcelaPreviewProps } from "../../types/pedidos";

export const ParcelaPreview = ({
  parcelas,
  onDateChange,
}: ParcelaPreviewProps) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium text-gray-700">Parcelas:</h4>
    <ul className="space-y-3">
      {parcelas.map((parcela) => (
        <li
          key={parcela.numero}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm p-3 bg-gray-50 rounded-md"
        >
          <div className="font-medium">Parcela {parcela.numero}</div>

          <div className="flex flex-1 max-w-md gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">
                Vencimento
              </label>
              <input
                type="date"
                value={parcela.dataVencimento}
                onChange={(e) => onDateChange(parcela.numero, e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Valor</label>
              <div className="py-2 px-3 bg-gray-100 rounded-md">
                {parcela.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
