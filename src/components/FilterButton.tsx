import { FilterIcon } from "./FilterIcon";

type FilterButtonProps = {
  onClick: () => void;
  hasFilter: boolean;
  label: string;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  hasFilter,
  label,
}) => (
  <button
    onClick={onClick}
    className="text-gray-400 hover:text-gray-600 flex items-center"
  >
    <FilterIcon />
    {hasFilter && <span className="ml-1 text-xs text-gray-600">{label}</span>}
  </button>
);
