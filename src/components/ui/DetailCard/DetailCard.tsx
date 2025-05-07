import { ReactNode } from "react";

// Tipos principais
type DetailValue = string | number | null | undefined;

interface DetailCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
}

interface DetailRowProps {
  label: string;
  value?: DetailValue;
  className?: string;
  direction?: "horizontal" | "vertical";
  emptyText?: string;
}

// Componente principal
export const DetailCard = ({
  title,
  children,
  className = "",
  headerActions,
}: DetailCardProps) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${className}`}
    >
      <header className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        {headerActions && <div>{headerActions}</div>}
      </header>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Subcomponente Row
const Row = ({
  label,
  value,
  className = "",
  direction = "horizontal",
  emptyText = "Não informado",
}: DetailRowProps) => {
  const isValueEmpty = value === undefined || value === null || value === "";

  const containerClasses = `
    ${className}
    ${
      direction === "horizontal"
        ? "flex flex-col sm:flex-row gap-2 sm:gap-4"
        : "flex flex-col gap-1"
    }
  `;

  const labelClasses = `
    ${direction === "horizontal" ? "w-full sm:w-48" : ""}
    font-medium text-gray-600 dark:text-gray-400
  `;

  const valueClasses = `
    flex-1 
    ${
      isValueEmpty
        ? "text-gray-400 dark:text-gray-500 italic"
        : "text-gray-800 dark:text-gray-200"
    }
  `;

  return (
    <div className={containerClasses}>
      <span className={labelClasses}>{label}:</span>
      <span className={valueClasses}>{isValueEmpty ? emptyText : value}</span>
    </div>
  );
};

DetailCard.Row = Row;

// Display names para melhor debugging
DetailCard.displayName = "DetailCard";
Row.displayName = "DetailCard.Row";
