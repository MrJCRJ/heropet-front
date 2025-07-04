import { ParcelamentoControlsProps } from "../../types/pedidos";

export const ParcelamentoControls = ({
  quantidadeParcelas,
  setQuantidadeParcelas,
}: ParcelamentoControlsProps) => (
  <div className="grid grid-cols-1">
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Quantidade de Parcelas (máx. 6)
      </label>
      <select
        value={quantidadeParcelas}
        onChange={(e) => setQuantidadeParcelas(Number(e.target.value))}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <option key={num} value={num}>
            {num}x
          </option>
        ))}
      </select>
    </div>
  </div>
);
