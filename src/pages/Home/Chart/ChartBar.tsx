import { MouseEvent } from "react";
import { ChartBarProps } from "../types/types";

/**
 * Componente que representa uma barra individual no gráfico financeiro
 *
 * @param type - Tipo da barra (vendas, compras ou lucro)
 * @param value - Valor numérico representado pela barra
 * @param monthIndex - Índice do mês no array de dados
 * @param hasData - Indica se existem dados para este mês
 * @param maxValue - Valor máximo usado para escalar a altura da barra
 * @param activeMonth - Mês atualmente ativo (hover)
 * @param activeType - Tipo de barra atualmente ativo (hover)
 * @param onBarHover - Callback para eventos de hover
 * @param colorClass - Classes CSS para a cor da barra
 */
const ChartBar = ({
  type,
  value,
  monthIndex,
  hasData,
  maxValue,
  activeMonth,
  activeType,
  onBarHover,
  colorClass,
}: ChartBarProps) => {
  const isActive =
    (activeMonth === null || activeMonth === monthIndex) &&
    (activeType === null || activeType === type);

  const barHeight = hasData ? (value / maxValue) * 100 : 2;
  const cursorStyle = hasData ? "pointer" : "default";
  const opacityClass = isActive ? "opacity-100" : "opacity-50";

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (hasData && onBarHover) {
      onBarHover(monthIndex, type, e);
    }
  };

  return (
    <div
      className={`w-1/3 rounded-t transition-all duration-200 ${colorClass} ${opacityClass}`}
      style={{
        height: `${barHeight}%`,
        cursor: cursorStyle,
      }}
      onMouseEnter={handleMouseEnter}
      aria-label={`${type}: ${value.toFixed(2)}`}
      role="img"
    />
  );
};

export default ChartBar;
