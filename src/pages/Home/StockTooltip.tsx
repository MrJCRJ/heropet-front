import { useEffect, useRef } from "react";

interface Tooltip {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

interface StockTooltipProps {
  tooltip: Tooltip;
  offset?: { x: number; y: number };
  maxWidth?: number;
}

const StockTooltip = ({
  tooltip,
  offset = { x: 10, y: 10 },
  maxWidth = 250,
}: StockTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Ajusta a posição do tooltip para não sair da tela
  useEffect(() => {
    if (tooltip.visible && tooltipRef.current) {
      const tooltipElement = tooltipRef.current;
      const { width, height } = tooltipElement.getBoundingClientRect();

      let adjustedX = tooltip.x + offset.x;
      let adjustedY = tooltip.y + offset.y;

      // Ajuste para não sair à direita
      if (adjustedX + width > window.innerWidth) {
        adjustedX = window.innerWidth - width - 5;
      }

      // Ajuste para não sair abaixo
      if (adjustedY + height > window.innerHeight) {
        adjustedY = tooltip.y - height - offset.y;
      }

      tooltipElement.style.left = `${adjustedX}px`;
      tooltipElement.style.top = `${adjustedY}px`;
    }
  }, [tooltip, offset.x, offset.y]);

  if (!tooltip.visible) return null;

  // Função para formatar o conteúdo do tooltip
  const formatTooltipContent = (content: string) => {
    return content.split("\n").filter((line) => line.trim() !== "");
  };

  return (
    <div
      ref={tooltipRef}
      className="fixed bg-gray-800 text-white p-3 rounded-md text-sm z-50 pointer-events-none shadow-xl transition-opacity duration-200"
      style={{
        maxWidth: `${maxWidth}px`,
        // Posição inicial será ajustada pelo useEffect
        left: `${tooltip.x + offset.x}px`,
        top: `${tooltip.y + offset.y}px`,
      }}
      role="tooltip"
      aria-hidden={!tooltip.visible}
    >
      {formatTooltipContent(tooltip.content).map((line, i) => (
        <div
          key={i}
          className={`
            ${i === 0 ? "font-bold border-b border-gray-600 pb-1 mb-1" : ""}
            ${
              line.includes(":")
                ? "grid grid-cols-2 gap-2"
                : "whitespace-nowrap"
            }
          `}
        >
          {line.includes(":") ? (
            <>
              <span className="text-gray-300">{line.split(":")[0]}:</span>
              <span>{line.split(":")[1].trim()}</span>
            </>
          ) : (
            line.trim()
          )}
        </div>
      ))}
    </div>
  );
};

export default StockTooltip;
