import { formatDateForInput } from "../../utils/date";

export const useParcelamento = (
  totalPedido: number,
  dataPedido: string,
  quantidadeParcelas: number,
  parcelamentoSemanal: boolean
) => {
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
        pago: false,
      });
    }

    return parcelas;
  };

  return { calcularParcelas };
};
