import React from "react";
import { DateFilter } from "../pages/Pedidos/List/FilterComponents/DateFilter";
import { TypeFilter } from "../pages/Pedidos/List/FilterComponents/TypeFilter";
import { StatusFilter } from "../pages/Pedidos/List/FilterComponents/StatusFilter";
import { FilterButton } from "./FilterButton";
import { SortButton } from "./SortButton";
import { TableHeaderProps } from "../types/pedidos";

export const TableHeader: React.FC<TableHeaderProps> = ({
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
  statusOptions,
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
