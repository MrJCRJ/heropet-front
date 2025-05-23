import React, { useState } from "react";
import { PedidoRow } from "./ListRow";
import { PedidoTableProps, FiltroStatus } from "../types";
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

  const handleMonthYearChange = (month?: number, year?: number) => {
    onFilterChange(
      filtroTipo === "TODOS" ? undefined : filtroTipo,
      filtroStatus,
      ordenacao,
      month,
      year
    );
    setShowDateFilter(false);
  };

  const getFilterLabel = () => {
    if (selectedMonth && selectedYear) {
      const monthName = new Date(0, selectedMonth - 1).toLocaleString(
        "default",
        { month: "short" }
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
  };

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <span>Tipo</span>
                <button
                  onClick={() => setShowTipoFilter(!showTipoFilter)}
                  className="text-gray-400 hover:text-gray-600 flex items-center"
                >
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
                  {filtroTipo && filtroTipo !== "TODOS" && (
                    <span className="ml-1 text-xs text-gray-600">
                      {filtroTipo === "VENDA" ? "Vendas" : "Compras"}
                    </span>
                  )}
                </button>
              </div>
              <TypeFilter
                show={showTipoFilter}
                currentFilter={filtroTipo}
                onFilterChange={(tipo) =>
                  onFilterChange(
                    tipo === "TODOS" ? undefined : tipo,
                    filtroStatus,
                    ordenacao
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
                <button
                  onClick={onOrdenarClick}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <span>Data</span>
                  <span>{ordenacao === "data_desc" ? "↓" : "↑"}</span>
                </button>
                <button
                  onClick={() => setShowDateFilter(!showDateFilter)}
                  className="text-gray-400 hover:text-gray-600 flex items-center"
                >
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
                  {getFilterLabel() && (
                    <span className="ml-1 text-xs text-gray-600">
                      {getFilterLabel()}
                    </span>
                  )}
                </button>
              </div>
              <DateFilter
                show={showDateFilter}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={setSelectedMonth}
                onYearChange={setSelectedYear}
                onApply={() =>
                  handleMonthYearChange(selectedMonth, selectedYear)
                }
                onClose={() => setShowDateFilter(false)}
              />
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
              <div className="flex items-center gap-1">
                <span>Status</span>
                <button
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                  className="text-gray-400 hover:text-gray-600 flex items-center"
                >
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
                  {filtroStatus && (
                    <span className="ml-1 text-xs text-gray-600">
                      {
                        statusOptions.find(
                          (s: { valor: FiltroStatus }) =>
                            s.valor === filtroStatus
                        )?.label
                      }
                    </span>
                  )}
                </button>
              </div>
              <StatusFilter
                show={showStatusFilter}
                currentFilter={filtroStatus}
                onFilterChange={(status) =>
                  onFilterChange(
                    filtroTipo === "TODOS" ? undefined : filtroTipo,
                    status,
                    ordenacao
                  )
                }
                onClose={() => setShowStatusFilter(false)}
              />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pedidos && pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr
                key={pedido._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  (window.location.href = `/pedidos/${pedido._id}`)
                }
              >
                <PedidoRow pedido={pedido} />
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                {pedidos ? "Nenhum pedido encontrado" : "Carregando..."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
