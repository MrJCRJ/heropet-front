import { FiltroPedido, FiltroStatus } from "./types";
import { OrdenacaoPedido } from "./usePedidoList";

interface PedidoFiltersProps {
  filtroTipo: FiltroPedido;
  filtroStatus?: FiltroStatus;
  ordenacao?: OrdenacaoPedido;
  onFilterChange: (
    tipo?: FiltroPedido,
    status?: FiltroStatus,
    ordem?: OrdenacaoPedido
  ) => void;
  onApplyFilters?: () => void; // Tornando opcional
}

export const PedidoFilters = ({
  filtroTipo,
  filtroStatus,
  ordenacao,
  onFilterChange,
  onApplyFilters,
}: PedidoFiltersProps) => {
  const tipos = [
    { valor: "TODOS", label: "Todos" },
    { valor: "VENDA", label: "Vendas" },
    { valor: "COMPRA", label: "Compras" },
  ] as const;

  const status = [
    { valor: "PAGO", label: "Pagos" },
    { valor: "PENDENTE", label: "Pendentes" },
    { valor: "CANCELADO", label: "Cancelados" },
    { valor: "PROCESSANDO", label: "Processando" },
    { valor: "ATRASADO", label: "Atrasados" },
  ] as const;

  const handleTipoChange = (tipo: FiltroPedido) => {
    onFilterChange(
      tipo === "TODOS" ? undefined : tipo, // Envia undefined quando for "TODOS"
      filtroStatus,
      ordenacao
    );
  };

  const handleStatusChange = (status?: FiltroStatus) => {
    onFilterChange(
      filtroTipo === "TODOS" ? undefined : filtroTipo,
      status, // Já envia undefined quando clicar em "Todos"
      ordenacao
    );
  };

  const handleOrdenacaoChange = (ordem: "data_asc" | "data_desc") => {
    onFilterChange(
      filtroTipo === "TODOS" ? undefined : filtroTipo,
      filtroStatus,
      ordem
    );
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Seção de Tipo */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo:</h3>
        <div className="flex flex-wrap gap-2">
          {tipos.map((tipo) => (
            <button
              key={tipo.valor}
              onClick={() => handleTipoChange(tipo.valor)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                (tipo.valor === "TODOS" && !filtroTipo) ||
                filtroTipo === tipo.valor
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tipo.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seção de Status */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Status:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusChange(undefined)}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              !filtroStatus
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {status.map((stat) => (
            <button
              key={stat.valor}
              onClick={() => handleStatusChange(stat.valor)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                filtroStatus === stat.valor
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {stat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seção de Ordenação */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Ordenar por data:
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleOrdenacaoChange("data_asc")}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              ordenacao === "data_asc"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Mais antigos primeiro
          </button>
          <button
            onClick={() => handleOrdenacaoChange("data_desc")}
            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
              ordenacao === "data_desc"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Mais recentes primeiro
          </button>
        </div>
      </div>

      {/* Botão para aplicar filtros */}
      <button
        onClick={onApplyFilters}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};
