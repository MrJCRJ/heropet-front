import { FiltroPedido, FiltroStatus, OrdenacaoPedido } from "../../types";

export type FilterChangeHandler = (
  tipo?: FiltroPedido,
  status?: FiltroStatus,
  ordem?: OrdenacaoPedido,
  mes?: number,
  ano?: number
) => void;

export type DateFilterProps = {
  show: boolean;
  selectedMonth?: number;
  selectedYear?: number;
  onMonthChange: (month?: number) => void;
  onYearChange: (year?: number) => void;
  onApply: () => void;
  onClose: () => void;
};

export type TypeFilterProps = {
  show: boolean;
  currentFilter?: FiltroPedido;
  onFilterChange: (tipo: FiltroPedido) => void;
  onClose: () => void;
};

export type StatusFilterProps = {
  show: boolean;
  currentFilter?: FiltroStatus;
  onFilterChange: (status?: FiltroStatus) => void;
  onClose: () => void;
};
