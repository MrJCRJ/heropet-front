import { CubeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import { formatarValorCompacto } from "./Utils";

interface ResumoCardProps {
  titulo: string;
  valor: number;
  cor: "blue" | "gray" | "red" | "yellow";
  icone: "cube" | "warning";
  tooltip: ReactNode;
  conteudoAdicional?: ReactNode;
  isMonetary?: boolean;
}

export const ResumoCard = ({
  titulo,
  valor,
  cor,
  icone,
  tooltip,
  conteudoAdicional,
  isMonetary = false,
}: ResumoCardProps) => {
  const cores = {
    blue: { text: "text-blue-600", icon: "text-blue-600" },
    gray: { text: "text-gray-600", icon: "text-gray-600" },
    red: { text: "text-red-600", icon: "text-red-600" },
    yellow: { text: "text-yellow-600", icon: "text-yellow-600" },
  };

  const Icone = icone === "cube" ? CubeIcon : ExclamationTriangleIcon;

  return (
    <div className="border-r border-gray-200 pr-4 group relative">
      <div className="cursor-default">
        <p className="text-sm text-gray-500">{titulo}</p>
        <div className="flex items-center">
          <p className={`text-xl font-semibold ${cores[cor].text}`}>
            {formatarValorCompacto(valor, isMonetary)}
          </p>
          <Icone className={`h-5 w-5 ${cores[cor].icon} ml-2`} />
        </div>
        {conteudoAdicional && (
          <div className="mt-2 space-y-1">{conteudoAdicional}</div>
        )}
      </div>

      <div className="absolute z-50 invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded mt-1 w-[300px] max-h-[70vh] overflow-y-auto shadow-xl">
        {tooltip}
      </div>
    </div>
  );
};
