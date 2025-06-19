export const formatarMoeda = (valor?: number): string => {
  if (valor === undefined || valor === null) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatarValorCompacto = (
  valor: number,
  isMonetary: boolean = true
): string => {
  if (isMonetary) {
    if (valor >= 1000000) return `${formatarMoeda(valor / 1000000)}M`;
    if (valor >= 1000) return `${formatarMoeda(valor / 1000)}K`;
    return formatarMoeda(valor);
  }

  // Para quantidades (não monetárias)
  if (valor >= 1000000) return `${(valor / 1000000).toFixed(1)}M`;
  if (valor >= 1000) return `${(valor / 1000).toFixed(1)}K`;
  return valor.toString();
};
