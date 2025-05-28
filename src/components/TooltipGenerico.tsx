// components/TooltipGenerico.tsx
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface TooltipGenericoProps {
  children?: ReactNode;
  conteudo: ReactNode;
  posicao?: "top" | "bottom" | "left" | "right";
  largura?: "sm" | "md" | "lg" | "xl";
  icone?: boolean;
  className?: string;
}

export const TooltipGenerico = ({
  children,
  conteudo,
  posicao = "bottom",
  largura = "md",
  icone = true,
  className = "",
}: TooltipGenericoProps) => {
  const larguras = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
    xl: "w-96",
  };

  const posicoes = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="group">
        {children ? (
          <div className="flex items-center">
            {children}
            {icone && (
              <InformationCircleIcon className="ml-1 h-4 w-4 text-gray-400 group-hover:text-blue-500" />
            )}
          </div>
        ) : (
          <InformationCircleIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
        )}
        <div
          className={`absolute z-50 invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded shadow-lg ${larguras[largura]} ${posicoes[posicao]}`}
        >
          {conteudo}
        </div>
      </div>
    </div>
  );
};
