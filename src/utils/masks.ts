export const formatCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/^(\d{2})(\d)/, "$1.$2") // Coloca ponto após os 2 primeiros dígitos
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Coloca ponto após os 3 próximos dígitos
    .replace(/\.(\d{3})(\d)/, ".$1/$2") // Coloca barra após os 3 próximos dígitos
    .replace(/(\d{4})(\d)/, "$1-$2") // Coloca hífen antes dos 2 últimos dígitos
    .slice(0, 18); // Limita o tamanho
};

export const formatPhone = (value: string): string => {
  const nums = value.replace(/\D/g, "");
  if (nums.length <= 10) {
    return nums
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  } else {
    return nums
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }
};
