type SortButtonProps = {
  onClick: () => void;
  label: string;
  order: string;
};

export const SortButton: React.FC<SortButtonProps> = ({
  onClick,
  label,
  order,
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 hover:text-gray-700"
  >
    <span>{label}</span>
    <span>{order === "data_desc" ? "↓" : "↑"}</span>
  </button>
);
