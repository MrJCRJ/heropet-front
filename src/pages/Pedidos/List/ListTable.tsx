import { useState } from "react";
import { PedidoRow } from "./ListRow";
import { FiltroPedido, FiltroStatus, PedidoTableProps } from "../types";

export const PedidoTable = ({
  pedidos,
  ordenacao,
  filtroTipo,
  filtroStatus,
  onOrdenarClick,
  onFilterChange,
}: PedidoTableProps) => {
  const [showTipoFilter, setShowTipoFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

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
      tipo === "TODOS" ? undefined : tipo,
      filtroStatus,
      ordenacao
    );
    setShowTipoFilter(false);
  };

  const handleStatusChange = (status?: FiltroStatus) => {
    onFilterChange(
      filtroTipo === "TODOS" ? undefined : filtroTipo,
      status,
      ordenacao
    );
    setShowStatusFilter(false);
  };

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
                  className="text-gray-400 hover:text-gray-600"
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
                </button>
              </div>
              {showTipoFilter && (
                <div className="absolute mt-2 z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                  {tipos.map((tipo) => (
                    <button
                      key={tipo.valor}
                      onClick={() => handleTipoChange(tipo.valor)}
                      className={`block w-full text-left px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                        (tipo.valor === "TODOS" && !filtroTipo) ||
                        filtroTipo === tipo.valor
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </div>
              )}
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
                  className="text-gray-400 hover:text-gray-600"
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
                </button>
              </div>
              {showDateFilter && (
                <div className="absolute mt-2 z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200 w-64">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mês
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedMonth || ""}
                      onChange={(e) =>
                        setSelectedMonth(Number(e.target.value) || undefined)
                      }
                    >
                      <option value="">Todos</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ano
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedYear || ""}
                      onChange={(e) =>
                        setSelectedYear(Number(e.target.value) || undefined)
                      }
                    >
                      <option value="">Todos</option>
                      {Array.from({ length: 5 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowDateFilter(false)}
                      className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() =>
                        handleMonthYearChange(selectedMonth, selectedYear)
                      }
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative">
              <div className="flex items-center gap-1">
                <span>Status</span>
                <button
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                  className="text-gray-400 hover:text-gray-600"
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
                </button>
              </div>
              {showStatusFilter && (
                <div className="absolute mt-2 right-0 z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                  <button
                    onClick={() => handleStatusChange(undefined)}
                    className={`block w-full text-left px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                      !filtroStatus
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Todos
                  </button>
                  {status.map((stat) => (
                    <button
                      key={stat.valor}
                      onClick={() => handleStatusChange(stat.valor)}
                      className={`block w-full text-left px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                        filtroStatus === stat.valor
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {stat.label}
                    </button>
                  ))}
                </div>
              )}
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
