import { formatDocumento } from "../../utils/masks";

interface SuggestionItem {
  nome?: string;
  documento: string;
}

interface SuggestionListProps {
  suggestions: SuggestionItem[];
  onSelect: (item: SuggestionItem) => void;
  visible: boolean;
}

export const SuggestionList = ({
  suggestions,
  onSelect,
  visible,
}: SuggestionListProps) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto border border-gray-200">
      {suggestions.map((item, index) => (
        <li
          key={index}
          onClick={() => onSelect(item)}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer flex flex-col"
        >
          <span className="font-medium">{item.nome}</span>
          <span className="text-gray-500 truncate">
            {formatDocumento(item.documento)}
          </span>
        </li>
      ))}
    </ul>
  );
};
