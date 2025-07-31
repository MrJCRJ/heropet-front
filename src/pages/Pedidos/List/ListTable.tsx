import React, { useState, useCallback } from "react";
import { PedidoTableProps } from "../../../types/pedidos";
import { TableHeader } from "../../../components/TableHeader";
import { TableBody } from "../../../components/TableBody";
import { statusOptions } from "../../../types/pedidos";
import { FiltroPedido, FiltroStatus } from "../../../types/pedidos";

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
    (
      tipo?: FiltroPedido,
      status?: FiltroStatus,
      mes?: number,
      ano?: number
    ) => {
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
            statusOptions={statusOptions}
          />
          <TableBody pedidos={pedidos || []} />
        </table>
      </div>
    </div>
  );
};
