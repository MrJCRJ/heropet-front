// FormParcelamento.tsx
import { formatDateForInput } from "./utils";

interface FormParcelamentoProps {
  totalPedido: number;
  dataPedido: string;
  quantidadeParcelas: number;
  setQuantidadeParcelas: (value: number) => void;
  parcelamentoSemanal: boolean;
  setParcelamentoSemanal: (value: boolean) => void;
}

export const FormParcelamento = ({
  totalPedido,
  dataPedido,
  quantidadeParcelas,
  setQuantidadeParcelas,
  parcelamentoSemanal,
  setParcelamentoSemanal,
}: FormParcelamentoProps) => {
  const calcularParcelas = () => {
    const valorParcela = totalPedido / quantidadeParcelas;
    const parcelas = [];
    const dataBase = new Date(dataPedido);

    for (let i = 1; i <= quantidadeParcelas; i++) {
      const dataVencimento = new Date(dataBase);

      if (parcelamentoSemanal) {
        dataVencimento.setDate(dataBase.getDate() + i * 7);
      } else {
        dataVencimento.setDate(dataBase.getDate() + i * 30);
      }

      parcelas.push({
        numero: i,
        dataVencimento: formatDateForInput(dataVencimento.toISOString()),
        valor:
          i === quantidadeParcelas
            ? totalPedido - valorParcela * (quantidadeParcelas - 1)
            : valorParcela,
      });
    }

    return parcelas;
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Parcelamento</h3>

      <div className="space-y-4">
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

        {quantidadeParcelas > 1 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Pré-visualização:
            </h4>
            <ul className="space-y-2">
              {calcularParcelas().map((parcela) => (
                <li
                  key={parcela.numero}
                  className="flex justify-between text-sm"
                >
                  <span>Parcela {parcela.numero}:</span>
                  <span>
                    {parcela.dataVencimento} -{" "}
                    {parcela.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
