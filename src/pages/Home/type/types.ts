import { MouseEvent } from "react";

// Tipos relacionados a Estoque
export interface MonthlyStock {
  month: number;
  year: number;
  stock: number;
  purchases: number;
  sales: number;
}

export interface Product {
  id: string;
  name: string;
  currentStock: number;
  monthlyStocks: MonthlyStock[];
}

// Tipos relacionados a UI/Gráficos
export interface TooltipPosition {
  x: number;
  y: number;
}

export interface TooltipItem {
  label: string;
  value: string;
  color?: string;
}

export interface TooltipContent {
  title: string;
  items: TooltipItem[];
}

export interface StockTooltipProps {
  visible: boolean;
  position: TooltipPosition;
  content: TooltipContent;
  offset?: { x: number; y: number };
  maxWidth?: number;
}

export type ActiveDataType = "sales" | "purchases" | "profit" | null;

export interface TooltipState {
  visible: boolean;
  position: TooltipPosition;
  content: TooltipContent;
}

// Tipos relacionados a Finanças
export type TransactionType = "COMPRA" | "VENDA";

export interface FinancialTransaction {
  id: string;
  date: Date;
  type: TransactionType;
  amount: number;
  month: number;
  year: number;
}

export interface MonthlyFinancialData {
  month: number;
  year: number;
  totalSales: number;
  totalPurchases: number;
  profit: number;
  transactions: FinancialTransaction[];
}

export interface FinancialSummary {
  currentBalance: number;
  monthlyData: MonthlyFinancialData[];
  totalSales: number;
  totalPurchases: number;
  totalProfit: number;
}

export interface MonthlyFinancialGroup {
  [key: string]: Omit<MonthlyFinancialData, "profit">;
}

// Tipos relacionados a Pedidos
export interface Pedido {
  _id: string;
  tipo: TransactionType;
  dataPedido: string;
  totalPedido: number;
}

// Props dos componentes
export interface ChartContainerProps {
  allMonthsData: MonthlyFinancialData[];
  monthlyData: MonthlyFinancialData[];
  maxValue: number;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export interface MonthlyChartProps {
  monthlyStocks: MonthlyStock[];
  initialStock: number;
  onMouseEnter: (
    month: MonthlyStock,
    index: number,
    e: React.MouseEvent
  ) => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  barWidth?: number;
  chartHeight?: number;
}

export interface MonthColumnProps {
  month: MonthlyFinancialData;
  monthIndex: number;
  hasData: boolean;
  maxValue: number;
  activeMonth: number | null;
  activeType: "sales" | "purchases" | "profit" | null;
  onBarHover: (
    monthIndex: number,
    type: "sales" | "purchases" | "profit",
    e: React.MouseEvent
  ) => void;
}

export type BarType = "sales" | "purchases" | "profit";

export interface ChartBarProps {
  type: "sales" | "purchases" | "profit";
  value: number;
  monthIndex: number;
  hasData: boolean;
  maxValue: number;
  activeMonth: number | null;
  activeType: "sales" | "purchases" | "profit" | null;
  onBarHover: (
    monthIndex: number,
    type: "sales" | "purchases" | "profit",
    e: MouseEvent<HTMLDivElement>
  ) => void;
  colorClass: string;
}
