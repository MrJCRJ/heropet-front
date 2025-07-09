import { useCallback } from "react";

export const useParcelamento = (
  totalPedido: number,
  quantidadeParcelas: number
) => {
  const calcularParcelas = useCallback(() => {
    const valorParcela = totalPedido / quantidadeParcelas;
    const parcelas = [];

    for (let i = 1; i <= quantidadeParcelas; i++) {
      parcelas.push({
        numero: i,
        dataVencimento: "",
        valor:
          i === quantidadeParcelas
            ? totalPedido - valorParcela * (quantidadeParcelas - 1)
            : valorParcela,
        pago: false,
      });
    }

    return parcelas;
  }, [totalPedido, quantidadeParcelas]);

  return { calcularParcelas };
};
