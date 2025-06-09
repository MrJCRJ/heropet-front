import { formatarValorCompacto } from "../../EstoqueSummary/Utils";
import { formatarMoeda } from "../../../../pedidoUtils";

type FinancialValueDisplayProps = {
  label: string;
  value: number;
  color?: "green" | "red" | "blue" | "orange" | "gray";
  icon?: React.ElementType;
  compact?: boolean;
};

export const FinancialValueDisplay = ({
  label,
  value,
  color = "gray",
  icon: Icon,
  compact = false,
}: FinancialValueDisplayProps) => {
  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
    orange: "text-orange-600",
    gray: "text-gray-600",
  };

  const formatValue = compact
    ? formatarValorCompacto(value)
    : formatarMoeda(value);

  return (
    <div>
      <p className={`text-sm ${colorClasses[color]}`}>{label}</p>
      <div className="flex items-center">
        <p className={`text-xl font-semibold ${colorClasses[color]}`}>
          {formatValue}
        </p>
        {Icon && <Icon className={`h-5 w-5 ml-2 ${colorClasses[color]}`} />}
      </div>
    </div>
  );
};
