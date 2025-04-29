import { ReactNode } from "react";

interface DetailCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DetailCard = ({ title, children, className = "" }: DetailCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

const Row = ({ label, value, className = "" }: DetailRowProps) => {
  if (value === undefined || value === null || value === "") {
    return (
      <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${className}`}>
        <span className="w-full sm:w-48 font-medium text-gray-600">
          {label}:
        </span>
        <span className="flex-1 text-gray-400 italic">Não informado</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${className}`}>
      <span className="w-full sm:w-48 font-medium text-gray-600">{label}:</span>
      <span className="flex-1 text-gray-800">{value}</span>
    </div>
  );
};

DetailCard.Row = Row;

export default DetailCard;
