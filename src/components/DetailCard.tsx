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
}

const Row = ({ label, value }: DetailRowProps) => {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <span className="w-full sm:w-48 font-medium text-gray-600">{label}:</span>
      <span className="flex-1 text-gray-800">{value}</span>
    </div>
  );
};

DetailCard.Row = Row;

export default DetailCard;
