import { formatDateForInput } from "./utils";
import { ParcelamentoControls } from "./ParcelamentoControls";
import { ParcelaPreview } from "./ParcelaPreview";

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

  const parcelas = calcularParcelas();

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Parcelamento</h3>

      <div className="space-y-4">
        <ParcelamentoControls
          quantidadeParcelas={quantidadeParcelas}
          setQuantidadeParcelas={setQuantidadeParcelas}
          parcelamentoSemanal={parcelamentoSemanal}
          setParcelamentoSemanal={setParcelamentoSemanal}
        />

        {quantidadeParcelas > 1 && <ParcelaPreview parcelas={parcelas} />}
      </div>
    </div>
  );
};
