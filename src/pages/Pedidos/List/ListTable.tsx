import React, { useState, useCallback } from "react";
import { PedidoRow } from "./ListRow";
import { PedidoTableProps } from "../types";
import { DateFilter } from "./FilterComponents/DateFilter";
import { TypeFilter } from "./FilterComponents/TypeFilter";
import { StatusFilter } from "./FilterComponents/StatusFilter";

// Definindo os status aqui ou importe de um arquivo de constantes
const statusOptions = [
  { valor: "PAGO", label: "Pagos" },
  { valor: "PENDENTE", label: "Pendentes" },
  { valor: "CANCELADO", label: "Cancelados" },
  { valor: "PROCESSANDO", label: "Processando" },
  { valor: "ATRASADO", label: "Atrasados" },
] as const;

// Componente para o cabeçalho da tabela
const TableHeader = ({
  showTipoFilter,
  setShowTipoFilter,
  showStatusFilter,
  setShowStatusFilter,
  showDateFilter,
  setShowDateFilter,
  onOrdenarClick,
  filtroTipo,
  filtroStatus,
  ordenacao,
  selectedMonth,
  selectedYear,
  getFilterLabel,
  onFilterChange,
}: {
  showTipoFilter: boolean;
  setShowTipoFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showStatusFilter: boolean;
  setShowStatusFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showDateFilter: boolean;
  setShowDateFilter: React.Dispatch<React.SetStateAction<boolean>>;
  onOrdenarClick: () => void;
  filtroTipo: string;
  filtroStatus?: string;
  ordenacao: string;
  selectedMonth?: number;
  selectedYear?: number;
  getFilterLabel: () => string | null;
  onFilterChange: (
    tipo?: string,
    status?: string,
    mes?: number,
    ano?: number
  ) => void;
}) => (
  <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="flex items-center gap-1">
          <span>Tipo</span>
          <FilterButton
            onClick={() => setShowTipoFilter(!showTipoFilter)}
            hasFilter={!!filtroTipo && filtroTipo !== "TODOS"}
            label={filtroTipo === "VENDA" ? "Vendas" : "Compras"}
          />
        </div>
        <TypeFilter
          show={showTipoFilter}
          currentFilter={filtroTipo}
          onFilterChange={(tipo) =>
            onFilterChange(
              tipo === "TODOS" ? undefined : tipo,
              filtroStatus,
              selectedMonth,
              selectedYear
            )
          }
          onClose={() => setShowTipoFilter(false)}
        />
      </th>

      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Cliente/Fornecedor
      </th>

      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
        <div className="flex items-center gap-1">
          <SortButton onClick={onOrdenarClick} label="Data" order={ordenacao} />
          <FilterButton
            onClick={() => setShowDateFilter(!showDateFilter)}
            hasFilter={!!getFilterLabel()}
            label={getFilterLabel() || ""}
          />
        </div>
        <DateFilter
          show={showDateFilter}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onFilterChange={(month, year) => {
            onFilterChange(
              filtroTipo === "TODOS" ? undefined : filtroTipo,
              filtroStatus,
              month,
              year
            );
          }}
          onClose={() => setShowDateFilter(false)}
        />
      </th>

      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Total
      </th>

      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
        <div className="flex items-center gap-1">
          <span>Status</span>
          <FilterButton
            onClick={() => setShowStatusFilter(!showStatusFilter)}
            hasFilter={!!filtroStatus}
            label={
              statusOptions.find((s) => s.valor === filtroStatus)?.label || ""
            }
          />
        </div>
        <StatusFilter
          show={showStatusFilter}
          currentFilter={filtroStatus}
          onFilterChange={(status) =>
            onFilterChange(
              filtroTipo === "TODOS" ? undefined : filtroTipo,
              status,
              selectedMonth,
              selectedYear
            )
          }
          onClose={() => setShowStatusFilter(false)}
        />
      </th>
    </tr>
  </thead>
);

// Componente para o corpo da tabela com scroll
const TableBody = ({ pedidos }: { pedidos: any[] }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {pedidos && pedidos.length > 0 ? (
      pedidos.map((pedido) => (
        <tr
          key={pedido._id}
          className="hover:bg-gray-50 cursor-pointer"
          onClick={() => (window.location.href = `/pedidos/${pedido._id}`)}
        >
          <PedidoRow pedido={pedido} />
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
          {pedidos ? "Nenhum pedido encontrado" : "Carregando..."}
        </td>
      </tr>
    )}
  </tbody>
);

// Componente reutilizável para botões de filtro
const FilterButton = ({
  onClick,
  hasFilter,
  label,
}: {
  onClick: () => void;
  hasFilter: boolean;
  label: string;
}) => (
  <button
    onClick={onClick}
    className="text-gray-400 hover:text-gray-600 flex items-center"
  >
    <FilterIcon />
    {hasFilter && <span className="ml-1 text-xs text-gray-600">{label}</span>}
  </button>
);

// Componente reutilizável para botões de ordenação
const SortButton = ({
  onClick,
  label,
  order,
}: {
  onClick: () => void;
  label: string;
  order: string;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 hover:text-gray-700"
  >
    <span>{label}</span>
    <span>{order === "data_desc" ? "↓" : "↑"}</span>
  </button>
);

// Componente para o ícone de filtro
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

export const PedidoTable: React.FC<PedidoTableProps> = ({
  pedidos,
  ordenacao,
  filtroTipo,
  filtroStatus,
  onOrdenarClick,
  onFilterChange,
}) => {
  const [showTipoFilter, setShowTipoFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  const getFilterLabel = useCallback(() => {
    if (selectedMonth && selectedYear) {
      const monthName = new Date(0, selectedMonth - 1).toLocaleString(
        "default",
        {
          month: "short",
        }
      );
      return `${monthName} ${selectedYear}`;
    }
    if (selectedMonth) {
      return new Date(0, selectedMonth - 1).toLocaleString("default", {
        month: "short",
      });
    }
    if (selectedYear) return selectedYear.toString();
    return null;
  }, [selectedMonth, selectedYear]);

  const handleFilterChange = useCallback(
    (tipo?: string, status?: string, mes?: number, ano?: number) => {
      setSelectedMonth(mes);
      setSelectedYear(ano);
      onFilterChange(tipo, status, ordenacao, mes, ano);
    },
    [onFilterChange, ordenacao]
  );

  return (
    <div className="shadow-sm rounded-lg border border-gray-200">
      <div
        className={`${
          pedidos && pedidos.length > 15 ? "max-h-[600px] overflow-y-auto" : ""
        }`}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            showTipoFilter={showTipoFilter}
            setShowTipoFilter={setShowTipoFilter}
            showStatusFilter={showStatusFilter}
            setShowStatusFilter={setShowStatusFilter}
            showDateFilter={showDateFilter}
            setShowDateFilter={setShowDateFilter}
            onOrdenarClick={onOrdenarClick}
            filtroTipo={filtroTipo}
            filtroStatus={filtroStatus}
            ordenacao={ordenacao}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            getFilterLabel={getFilterLabel}
            onFilterChange={handleFilterChange}
          />
          <TableBody pedidos={pedidos || []} />
        </table>
      </div>
    </div>
  );
};
