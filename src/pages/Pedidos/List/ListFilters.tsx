import { FiltroPedido } from "./types";

type PedidoFiltersProps = {
  filtroAtivo: FiltroPedido;
  onFilterChange: (tipo?: FiltroPedido) => void;
};

export const PedidoFilters = ({
  filtroAtivo,
  onFilterChange,
}: PedidoFiltersProps) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {(["TODOS", "VENDA", "COMPRA"] as FiltroPedido[]).map((filtro) => (
      <button
        key={filtro}
        onClick={() => onFilterChange(filtro === "TODOS" ? undefined : filtro)}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          filtroAtivo === filtro
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {filtro === "TODOS"
          ? "Todos"
          : filtro === "VENDA"
          ? "Vendas"
          : "Compras"}
      </button>
    ))}
  </div>
);
