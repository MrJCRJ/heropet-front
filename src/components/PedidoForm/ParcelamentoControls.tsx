interface ParcelamentoControlsProps {
  quantidadeParcelas: number;
  setQuantidadeParcelas: (value: number) => void;
  parcelamentoSemanal: boolean;
  setParcelamentoSemanal: (value: boolean) => void;
}

export const ParcelamentoControls = ({
  quantidadeParcelas,
  setQuantidadeParcelas,
  parcelamentoSemanal,
  setParcelamentoSemanal,
}: ParcelamentoControlsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Quantidade de Parcelas (máx. 4)
      </label>
      <select
        value={quantidadeParcelas}
        onChange={(e) => setQuantidadeParcelas(Number(e.target.value))}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {[1, 2, 3, 4].map((num) => (
          <option key={num} value={num}>
            {num}x
          </option>
        ))}
      </select>
    </div>

    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="parcelamentoSemanal"
        checked={parcelamentoSemanal}
        onChange={(e) => setParcelamentoSemanal(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label
        htmlFor="parcelamentoSemanal"
        className="text-sm font-medium text-gray-700"
      >
        Parcelamento Semanal (7, 14, 21, 28 dias)
      </label>
    </div>
  </div>
);
